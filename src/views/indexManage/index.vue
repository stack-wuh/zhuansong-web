<template>
    <section class='my-page-pay'>
        <my-card-schema
            v-for="(item, index) in CardList"
            :key="index">
            <my-card-location 
                v-if="index < 2" 
                ref="myChild" 
                :list="CardList[index]" 
                :type="index"
                :form-obj="form_order">
            </my-card-location>
            <my-card-goods-info
                ref="myChild" 
                v-else 
                :list="CardList[index]"
                :classify="classifyList"
                :form-obj="form_order"
                @changeInput="getOrderCurrentWeight"
                >
            </my-card-goods-info>
        </my-card-schema>

        <my-card-schema mult>
            <my-order-schema>
                <my-order-item
                 @submitEvent="handleClickSubmit"
                 @nextEvent="handleClickNext" 
                 :additional="additional"
                 :imgCode="imgCode"
                 :weight="currentWeight"
                 :canShowPayBox="SHOW_PAY_BOX">
                </my-order-item>
            </my-order-schema>
            <section class="my-pp-card__rg">
                <div style="width: 600px; height: 400px;" id="amap"></div>
            </section>
        </my-card-schema>
        <el-dialog 
            :visible.sync="visibleDialog"
            :before-close="dialogBeforeClose"
            title="微信支付"
            >
            <section class="my-dialog__header">
                <p class="my-dialog__header--title">支付金额 
                    <span class="my-dialog__header--money is-danger">{{currentTotalMoney - currentCouponMoney + currentComputedMoney}}</span>
                </p>
                <p class="my-dialog__header--tips">{{dialog_count}}s之后自动关闭</p>
            </section>
            <section class="my-qrbox">
                <section id="qrcode"></section>
            </section>
            <section class="my-img-box">
                <img src="../../assets/imgs/weixin.png" alt="">
            </section>
        </el-dialog>

        <section v-if="SHOW_COUPON_BOX" @click="SHOW_COUPON_BOX = false" class="my-dialog-coupon">
            <section class="my-dialog-coupon__img-box">
                <img src="https://res.squrab.com/b/first-single.png" alt="logo_img">
            </section>
        </section>
    </section>
</template>

<script>
 const SHOW_PAY_BOX = false
 const OriginPointer = 'https://res.squrab.com/web/origin_icon.png'
 const DestinationPointer = 'https://res.squrab.com/web/destination_icon.png'

 import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
 import MapService from  'wqr-amap'
 import {Toast, getLocalItem, setLocalItem} from '@/utils/global'
 import QRCode from 'qrcodejs2'

 import CardList from './cardList'
 import MyCardLocation from '@/views/indexManage/child/cardLocation'
 import MyCardGoodsInfo from '@/views/indexManage/child/cardInfo'
 import MyCardSchema from '@/views/indexManage/schema/card'
 import MyOrderSchema from '@/views/indexManage/schema/orderSchema'
 import MyOrderItem from '@/views/indexManage/child/orderItem' 

 import Scroll2top  from '@/mixins/scroll.js'
 export default{
    name: 'MyOrderIndex',
    components: {
        MyCardLocation,
        MyCardGoodsInfo,
        MyCardSchema,
        MyOrderSchema,
        MyOrderItem
    },
    provide: {
        Toast: Toast
    },
    props: {},
    watch: {},
    computed: {
        ...mapState({
            classifyList: state => state.Index.classifyList,
            isShowImgBox: state => state.Index.canShowImgBox,
            imgCode: state => state.Index.imgCode,
            orderInfo: state => state.Index.orderInfo,
            couponList: state => state.Index.couponList,
            formResultStatus: state => state.Index.result,
            currentTotalMoney: state => state.Index.currentMoney
        }),
        currentCouponMoney(){
            let reduce_money = this.couponList.find(kk => kk.id == this.form_order.coupon_id) && 
                                    this.couponList.find(kk => kk.id == this.form_order.coupon_id).reduce_money
            return reduce_money || 0
        },
        additional(){ // 里程
            let {additional_distance} = this.orderInfo
            let result = (additional_distance/1000).toFixed(2)
            return result = isNaN(result) ? 0 : result
        },
        queryPath(){ // alipay 支付回调之后的页面query
            let {out_trade_no} = this.$route.query
            return out_trade_no  ? true : false
        },
        currentComputedMoney(){
            return this.form_order.weight > 4 ? (this.form_order.weight - 4) * 2 : 0
        }
    },
    data(){
        return {
            OriginPointer,
            DestinationPointer,
            CardList, // 表单的列表
            SHOW_PAY_BOX, // 是否登录状态展示box
            SHOW_COUPON_BOX: false, // 是否展示优惠券遮罩层
            form_signin: { // 登录的对象
                phone: '',
                captcha: '',
                code: ''
            },
            form_order: { // order页的全部对象
                shipper_address: {
                    adcode: '',
                    Ing: '',
                    lat: '',
                    formatted_address: ''
                },
                recipient_address: {
                    adcode: '',
                    Ing: '',
                    lat: '',
                    formatted_address: ''
                },
                weight: 5,
                coupon_id: 0,
                type: 1,
                shipper: '',
                shipper_phone:'',
                recipient: '',
                recipient_phone: '',
                goods_type: ''
            },
            isShowPopover: false, // 打开验证码popover
            isShowBtnLoading: false, // btn的loading状态
            mapService: null, // map instance
            timer_count: 60, // btn状态的倒计时
            dialog_count: 60, // dialog对话框的倒计时关闭
            temp_pay_type: 'zhifubao', // 支付方式
            tokenObj: {}, // 缓存token的localStorage
            qrCode: null, // 二维码的instance
            visibleDialog: false, // 微信支付的dialog
            currentWeight: 5, //传递物品重量
        }
    },
    methods: {
        ...mapMutations(['SET_CURRENT_MONEY']),
        ...mapActions([
            'GetClassifyList', 
            'GetImgCode', 
            'PostMsgCode', 
            'GetPriceInfo', 
            'PostUserLogin', 
            'GetCouponInfo', 
            'PostOrder',
            'GetAlipay',
            'GetWechat',
            'GetOrderState'
            ]),
        /**按钮 -- 下一步 
         * 先登录 ， 再付款
          */
        handleClickNext(e){
            let childs = this.$refs.myChild
            childs[0].handleSubmit()
            childs[1].handleSubmit()
            setTimeout(() => {
                let result = this.formResultStatus.slice(0,2).every(kk => kk)
                this.PostUserLogin(e.form).then(res => {
                    let {code, msg} = res
                    if(code !== 10000) {
                        return
                    }
                    let local = localStorage
                    local.setItem('token', JSON.stringify(res.data))
                    let {token} = res.data
                    if(res.data.type == 0) { // 0为新用户, 要弹出首单减免
                        this.SHOW_COUPON_BOX = true
                    }
                    if(result) {
                        this.GetCouponInfo({form: this.form_order, token}).then(res => {
                            let {code, msg} = res
                            if(code !== 10000) {
                                return
                            }
                            this.form_order.coupon_id = this.couponList.slice(0,1)[0].id
                            this.SHOW_PAY_BOX = true
                        }) 
                    }
                })  
            }, 300)
        },
        /**
         * 单击按钮事件 -- 选择物品信息
         */
        handleClickChoose(item){
            this.form_order.goods_type = item.vlaue
            this.$set(this.form_order, 'goods_type', item.value)
        },
        /** 切换popover */
        handleClickToggle(){
            // this.isShowPopover = true
            this.GetImgCode().then(res => {
                let {code} = res
                if(code === 10000) {
                    this.isShowPopover = true
                }
            })
        },
        /**获取短信验证码 */
        handleClickPostMsg(){
            let timer = null
            if(timer) clearInterval(timer)
            if(!this.form_signin.phone) {
                return Toast({msg: '请输入手机号', type: 'error'})
            }else if(!this.form_signin.captcha) {
                return Taost({msg: '请输入图片验证码', type: 'error'})
            }
            this.PostMsgCode(this.form_signin).then(res => {
                let {code} = res
                if(code !== 10000) return
                this.isShowPopover = false
                this.isShowBtnLoading = true
                timer = setInterval(() => {
                    if(this.timer_count > 0) {
                        this.timer_count --
                    }else {
                        this.isShowBtnLoading = false
                    }
                }, 1000)
            })
        },

        /**
         * dialog对话框的关闭回调
         */
        dialogBeforeClose(){
            this.visibleDialog = false
            setTimeout(() => {
                this.$router.push({path: '/index/callback'})
            }, 1000)
        },

        /**
         * 选择具体地址之后发起获取价格的请求
         * 对价格重新赋值
         */
        handleSelect(e, item){
            this.mapService.lngLatToAddress([e.location.lng, e.location.lat]).then(res => {
                let {shipper_address: {lat: slat, lng: slng}, recipient_address: {lat: rlat, lng: rlng}} = this.form_order
                let _obj = {
                    adcode: res.addressComponent.adcode,
                    lng: e.location.lng,
                    lat: e.location.lat,
                    formatted_address:res.formattedAddress
                }
                if(item.field == 'temp_send') {
                    this.form_order.shipper_address = _obj
                    this.mapService.addMarker([_obj.lng, _obj.lat], '起点', this.OriginPointer)
                    setLocalItem('temp_send', JSON.stringify([_obj.lng, _obj.lat]))
                    this.mapService.setMapCenter([_obj.lng, _obj.lat])
                }else {
                    this.form_order.recipient_address = _obj
                    setLocalItem('temp_receive', JSON.stringify([_obj.lng, _obj.lat]))
                    this.mapService.addMarker([_obj.lng, _obj.lat], '终点', this.DestinationPointer)
                }
                let result_shipper = Object.values(this.form_order.shipper_address).some(kk => kk)
                let result_recipient = Object.values(this.form_order.recipient_address).some(kk => kk)
                if(result_shipper && result_recipient) this.GetPriceInfo(this.form_order)
                if(result_shipper && result_recipient && getLocalItem('token')) this.GetCouponInfo({form: this.form_order, token: getLocalItem('token').token})
                let position = {
                    one: [this.form_order.shipper_address.lng, this.form_order.shipper_address.lat],
                    two: [this.form_order.recipient_address.lng, this.form_order.recipient_address.lat]
                }
                // this.mapService.drawPolyLine([position.one, position.two])
                let distance = this.mapService.caculateDistance(position)
                if(distance < 3000) {
                    this.mapService.setMapZoom(12)
                }else {
                    this.mapService.setMapZoom(10)
                }
            })
        },
        
        /**
         * 付款失败之后, 重新计算价格
         */
        reloadPrice(){
            let _this = this
            let local = localStorage
            let data = local.getItem('local_form_order') && JSON.parse(local.getItem('local_form_order'))
            let ship = data.shipper_address, recipient = data.recipient_address
            let temp_arr = [
                {
                    location: {
                        location: {
                            lng: ship.lng,
                            lat: ship.lat
                        }
                    },
                    item: {
                        field: 'temp_send'
                    }
                },
                {
                    location: {
                        location: {
                            lng: recipient.lng,
                            lat: recipient.lat
                        }
                    },
                    item: {
                        field: 'temp_recipient'
                    }
                },
            ]
            setTimeout(() => {
                temp_arr.forEach((kk,kd) => {
                    this.handleSelect(kk.location, kk.item)
                })
            }, 3000)
 
        },
        /**获取当前的重量 */
        getOrderCurrentWeight(e){
            this.currentWeight = e
        },
        /**
         *立即下单和付款
         * 之后跳转到callback页面
         */
        handleClickSubmit(e){
            /**
             * childs中第一个对象是发货对象， 第二个是收货对象
             */
            let childs = this.$refs.myChild
            let [ship, recipients, goods] = childs
            let local = localStorage
            let token = local.getItem('token') ? JSON.parse(local.getItem('token')) : {}
            let local_form_order = local.getItem('local_form_order')
            childs.forEach((kk, kd) => {
                kk.handleSubmit()
            })
            setTimeout(() => {
                let result = this.formResultStatus.every(kk => kk)
                if(result) {
                    let {shipper, shipper_phone, detailed, temp_send} = ship.$data.temp_form
                    let {recipient, recipient_phone, detailed: r_detailed, temp_receive} = recipients.$data.temp_form
                    let {goods_type, weight, note} = goods.$data.temp_form
                    this.form_order = {
                        ...this.form_order,
                        shipper,
                        shipper_phone,
                        recipient,
                        recipient_phone,
                        goods_type,
                        weight,
                        note,
                        type: 1,
                        temp_receive,
                        temp_send,
                        coupon_id: e.form.coupon_id
                    }
                    this.form_order.shipper_address.detailed = detailed
                    this.form_order.recipient_address.detailed = r_detailed
                    local.setItem('local_form_order', JSON.stringify({...this.form_order, totalMoney: this.currentTotalMoney, additional: this.additional}))
                    this.PostOrder({token: token.token, form: this.form_order}).then(res => {
                        let {code} = res
                        if(code !== 10000) {
                            return
                        }
                        local.setItem('local_order_info', JSON.stringify(res))
                        switch (e.payType) {
                            case 'zhifubao':
                                this.GetAlipay(token.token).then(res => {
                                    const div = document.createElement('div')
                                    div.innerHTML = res
                                    document.body.appendChild(div)
                                    const elem = document.getElementById('alipay_submit')
                                    elem.submit()
                                    }).catch(err => {
                                    //Todo 支付宝调取失败
                                })
                                break
                            case 'weixin':
                                this.visibleDialog = true
                                this.GetWechat(token.token).then(res => {
                                    let timer = null
                                    if (this.qrCode) {
                                        this.qrCode.clear()
                                        this.qrCode.makeCode(res.code_url)
                                    } else {
                                        setTimeout(() => {
                                            this.qrCode = new QRCode(document.getElementById('qrcode'), {
                                                width: 260, //图像宽度
                                                height: 260, //图像高度
                                                colorDark: '#000000', //前景色
                                                colorLight: '#ffffff', //背景色
                                                typeNumber: 4,
                                                correctLevel: QRCode.CorrectLevel.H
                                            })
                                            this.qrCode.makeCode(res.code_url)
                                    }, 500)
                                    if(timer) clearInterval(timer)
                                    timer = setInterval(() => {
                                        if(this.dialog_count > 0) {
                                            this.dialog_count --
                                        }else {
                                            this.dialog_count = 0
                                            this.visibleDialog = false
                                            setTimeout(() => {
                                                this.$router.push({path: '/index/callback'})
                                            }, 1000)
                                            clearInterval(timer)
                                        }
                                    }, 1000)
                                    }
                                }).catch(err => {
                                //Todo 微信调取失败
                                })
                                break
                        }
                    })
                }
            }, 300)
        },
        /**
         * 初始化地图
         */
        mapInit(){
          let obj = {
            id: 'amap',
            key: '802b75ae5abe1bdddc4a67c1c050ad61',
            mapStyle: {
                zoom: 14,
                resizeEnable: true,
                },
            }
            this.mapService = new MapService(obj)
            this.mapService.initMap().then(() => {
                this.mapService.showLocation()
            })
        }
    },
    created(){
        let local = localStorage, local_form_order = null
        this.tokenObj = local.getItem('token') ? local.getItem('token') : ''
        this.tokenObj = this.tokenObj && JSON.parse(this.tokenObj)
        local_form_order = local.getItem('local_form_order')
        local_form_order = local_form_order && JSON.parse(local_form_order)

        if(local_form_order) {
            this.form_order = {
                ...this.form_order,
                ...local_form_order
            }
            // 若是重新支付, 重新获取优惠券
            let result_shipper = Object.values(this.form_order.shipper_address).some(kk => kk)
            let result_recipient = Object.values(this.form_order.recipient_address).some(kk => kk)
            if(result_shipper && result_recipient) this.GetPriceInfo(this.form_order)
        }
        if(this.tokenObj) { // 登录状态重新获取价格
            this.SHOW_PAY_BOX = true
            if(local_form_order) { // 下订单成功的时候, 根据位置去获取价格
                setTimeout(() => {
                    this.reloadPrice()
                }, 1000)
            }
        }else {
            this.SHOW_PAY_BOX = false
        }
        this.GetClassifyList()
        this.mapInit()
    },
    mixins: [Scroll2top]
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/color.scss';
@include b(page-pay) {
    width: inherit;
    padding: 20px;
    box-sizing: border-box;
    background-color: #F7F5F5;
}
@include b(qrbox) {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background-color: #fff;
}

@include b(img-box){
    width: 300px;
    margin: 0 auto;
}

@include b(dialog) {
    @include e(header) {
        @include flex($dir: row, $align: center, $justify: flex-end);
        height: 80px;
        @include m(tips) {
            width: 33%;
            text-align: right;
            align-self: flex-start;
        }
        @include m(money) {
            margin-left: 10px;
        }
        @include m(title){
            flex: 1;
            padding-right: 11%;
            text-align: right;
            font-size: 17px;
        }
    }
}

@include b(dialog-coupon) {
 position: fixed;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 user-select: none;
 background-color: rgba(0, 0, 0, .5); 
 z-index:  1000000;
    @include e(img-box) {
       position: absolute;
       left: 50%;
       top:50%;
       width: 30%;
       overflow: hidden;
       transform: translateX(-50%) translateY(-50%);
       & > img {
            width: auto;
            max-width: 100%;
        }
    }
}
</style>