<template>
    <section class='my-cm-order-info'>
        <el-form
            ref="myOrderInfoForm"
            :model="form_signin"
            class="my-order-form"
            label-width="120px"
            :rules="Rules">
            <el-form-item 
                label="里程">
                <span>
                    <strong class="is-danger">{{additional}}</strong> 公里
                </span>
            </el-form-item>
            <el-form-item
                label="重量">
                <span>
                    <strong class="is-danger">{{currentWeight}}</strong> 公斤
                </span>
            </el-form-item>
            <el-form-item 
                label="订单总额">
                <span>
                    <strong class="is-danger">{{(currentTotalMoney - currentCouponMoney + currentComputedMoney) || 0}}</strong> 元
                </span>
                <span>
                    <el-popover trigger="hover" placement="top">
                        <section class="my-popover-content">
                            <p>起步价格: <strong class="is-strong">{{orderInfo.distance_start_fee || 0}}</strong>元 (3公里5公斤以内)</p>
                            <p>超出里程价: <strong class="is-strong">{{orderInfo.distance_fee || 0}}</strong>元</p>
                            <p>超出公斤价: <strong class="is-strong">{{currentComputedMoney || 0}}</strong>元</p>
                            <p>夜间费: <strong class="is-strong">{{orderInfo.night_fee || 0}}</strong>元</p>
                        </section>
                        <img class="is-other" slot="reference" src="../../../assets/imgs/bm_wenhao.png" alt="wenhao">
                    </el-popover>
                </span>
            </el-form-item>
            <template v-if="!canShowPayBox">
                <el-form-item 
                    label="下单手机号"
                    prop="phone">
                    <el-input 
                        v-model="form_signin.phone" 
                        style="width: calc(90% - 116px)"
                        placeholder="请编辑有效手机号">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="验证码"
                    prop="code">
                    <section style="width: 100%; display: flex;">
                        <el-input 
                            v-model="form_signin.code" 
                            placeholder="输入验证码">
                        </el-input>
                        <el-popover
                            style="margin-left: 10%"
                            v-model="isShowPopover"
                            placement="top"
                            trigger="click">
                            <section class="my-code-img-box">
                                <section class="my-code-img-box__flex-box">
                                    <el-input 
                                        v-model="form_signin.captcha"
                                        placeholder="请输入右侧验证码"
                                        class="my-code-img-box__input" />
                                    <div class="my-code-img-box__img">
                                        <el-tooltip 
                                            effect="dark"
                                            content="点击更换验证码"
                                            placement="right-start">
                                            <img
                                                @click="handleReloadCode"
                                                :src="imgCode.path" 
                                                alt="code">
                                        </el-tooltip>
                                    </div>
                                </section>
                                <p 
                                    v-if="isShowCodeTips"
                                    class="is-danger my-code-img-box__tips"
                                    >{{codeTips}}
                                </p>
                                <section class="my-code-img-box__btn-area">
                                    <el-button 
                                        size="mini" 
                                        type="danger"
                                        @click="handleClosePopover">取消
                                    </el-button>
                                    <el-button 
                                        @click="handleClickPostMsg"
                                        size="mini" 
                                        type="primary">确认
                                    </el-button>
                                </section> 
                            </section>
                            <section slot="reference">
                                <el-button
                                    style="background-color: #f4b828; color: #fff;"
                                    :loading="isBtnLoading"  
                                    @click="handleTogglePopover"
                                    >
                                    <span v-if="!isBtnLoading">点击获取验证码</span>
                                    <span v-else>{{timer_count}}s之后再次获取</span>
                                </el-button>
                            </section>
                        </el-popover>
                    </section>
                </el-form-item>
                <section class="my-cm-order-info__btn-area">
                    <el-button
                        @click="handleClickNext" 
                        type="primary"
                        class="my-cm-order-info__btn-area--item">下一步
                    </el-button>
                </section>
            </template>
            <template v-else>
                <el-form-item
                    label="优惠券">
                    <el-select
                        @change="SET_CURRENT_MONEY" 
                        v-model="form_order.coupon_id"
                        placeholder="请选择优惠券">
                        <el-option 
                            v-for="(ss, sd) in couponList"
                            :key="sd"
                            :label="ss.info"
                            :value="ss.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="支付方式">
                    <template>
                        <section class="my-radiobox-group">
                            <span 
                                @click="handleRadioChange(0)" 
                                class="my-radiobox-group__item"
                                :class="[
                                    {'is-pay-group-active': temp_pay_type == 'zhifubao'}
                                ]"></span>
                            <span 
                                @click="handleRadioChange(1)" 
                                class="my-radiobox-group__item"
                                :class="[
                                    {'is-pay-group-active': temp_pay_type == 'weixin'}
                                ]"></span>
                        </section>
                    </template>
                </el-form-item>
                 <section class="my-cm-order-info__btn-area">
                    <el-button
                        @click="handleSubmit"
                        type="primary"
                        class="my-cm-order-info__btn-area--item">立即下单
                    </el-button>
                </section>
            </template>
        </el-form>
    </section>
</template>

<script>
 import {mapActions, mapState, mapMutations} from 'vuex'
 import {validPhone} from '@/utils/valid'
 const Rules = {
     phone: [
         {
             required: true,
             validator: validPhone,
             trigger: ['change', 'blur']
         }
     ],
     code: [
         {
             required: false,
             message: '请编辑验证码',
             trigger: ['blur', 'change']
         }
     ]
 }
 export default{
    name: 'MyOrderItem',
    components: {},
    props: {
        additional: {
            type: [String, Number],
            required: true,
            default: 0
        },
        imgCode: {
            type: Object,
            required: true
        },
        canShowPayBox: {
            type: Boolean,
            required: true,
            default: false
        },
        weight: {
            type: [String, Number],
            required: true,
            default: 0
        }
    },
    inject: ['Toast'],
    watch: {
        isShowPopover(){
            this.form_signin.captcha = ''
        },
        couponList(){
            this.form_order.coupon_id = this.couponList.slice(0, 1)[0].id
        },
        weight(){
           this.currentComputedMoney =  this.weight > 5 ? (this.weight-5) * 2 : 0 
        }
    },
    computed: {
        ...mapState({
            couponList: state => state.Index.couponList,
            orderInfo: state => state.Index.orderInfo,
            currentTotalMoney: state => state.Index.currentMoney
        }),
        currentWeight(){
            return this.weight > 5 ? this.weight : '5'
        },
        currentCouponId(){
            return this.couponList.slice(0,1)[0].id
        },
        currentCouponMoney(){
            return Number.parseFloat(this.couponList.find(kk => kk.id == this.form_order.coupon_id).reduce_money) || 0
        },
    },
    data(){
        return {
            Rules,
            isShowPopover: false,
            isShowCodeTips: false,
            codeTips: '请输入右侧验证码',
            form_signin: {
                phone: '',
                captcha: '',
                code: ''
            },
            form_order: {
                coupon_id: 0
            },
            timer: null,
            timer_count: 60,
            isBtnLoading: false,
            temp_pay_type: 'zhifubao',
            currentComputedMoney: 0
        }
    },
    methods: {
        ...mapActions(['GetImgCode', 'PostMsgCode']),
        ...mapMutations(['SET_CURRENT_MONEY']),
        /**radio 的单选事件 */
        handleRadioChange(type){
            this.temp_pay_type = type == 0 ? 'zhifubao' : 'weixin'
        },

        /**popover激活时获取验证码 */
        handleTogglePopover (){
            this.GetImgCode().then(res => {
                let {code, msg} = res
                if(code === 10000) {
                    this.isShowPopover = true
                } else {
                    Toast({type: 'error', msg, duration: 2000})
                }
            })
        },

        /**重新获取验证码 */
        handleReloadCode(){
            this.GetImgCode().then(res => {
                let {code, msg} = res
                if(code === 10000) {
                    this.form_signin.captcha = ''
                } else {
                    Toast({type: 'error', msg, duration: 2000})
                }
            })
        },

        /**popover 关闭清空表单 */
        handleClosePopover(){
            this.isShowPopover = false
            this.isShowCodeTips = false
            this.form_signin.captcha = ''
        },

        /**获取短信验证码 */
        handleClickPostMsg(){
            if(this.timer) {
                this.timer_count = 60
                clearInterval(this.timer)
            } 
            if(!this.form_signin.captcha) {
                this.isShowCodeTips = true
                return
            }
            this.$refs.myOrderInfoForm.validate(valid => {
                if(valid) {
                    this.PostMsgCode(this.form_signin).then(res => {
                        let {code, msg} = res
                        if(code !== 10000) {
                            Toast({type: 'error', msg, duration: 2000})
                            return
                        }
                        this.handleClosePopover()
                        this.$set(this.Rules.code[0], 'required', true)
                        this.isBtnLoading = true
                        this.timer = setInterval(() => {
                            if(this.timer_count > 0) {
                                this.timer_count -- 
                            }else {
                                this.isBtnLoading = false
                                this.timer_count = 60
                                this.$set(this.Rules.code[0], 'required', false)
                            }
                        }, 1000)
                    }).catch(err => {
                        this.Toast({msg: '验证码或手机号错误, 请重试!', type: 'error', duration: 3})
                    })
                }else {
                    this.Toast({msg: '请检查订单详情', type: 'error', duration: 3})
                }
            })
        },

        /**
         * 下一步 -- click
         * 先登录， 再付款
         */
        handleClickNext(){
           this.$refs.myOrderInfoForm.validate(valid => {
               if(valid) {
                   this.$emit('nextEvent', {form: this.form_signin})
               }else {
                   this.Toast({msg: '请检查订单详情', type: 'error', duration: 3})
               }
           }) 
        },

        /**立即下单 */
        handleSubmit(){
            this.$emit('submitEvent', {form: this.form_order, payType: this.temp_pay_type})
        }
    },
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/color.scss';

@include b(cm-order-info) {
    width: 100%;
    height: 100%;
    padding-right: 50px;
    box-sizing: border-box;

    @include b(order-form) {
        @include flex($dir: column, $justify: space-between, $align: stretch);
        width: 100%;
        height: 100%;
        padding: 15px 0;
        box-sizing: border-box;
    }

    @include e(btn-area) {
        padding-left: 40px;

        @include m(item) {
            width: 100%;
            height: 50px;
        }
    }
}
@include b(code-img-box) {
    @include flex($dir: row, $wrap: wrap);
    width: 300px;
    height: 100px;
    background-color: #fff;
    @include e(flex-box){
        @include flex($dir: row, $align: center, $justify: space-between, $wrap: nowrap);
        width: 100%;
    }
    @include e(tips) {
      margin-top: -5%;
    }
    @include e(input) {
        width: 60%;
        margin-right: 5%;
    }
    @include e(img) {
        width: 35%;

        & > img {
            width: auto;
            max-width: 100%;
        }
        &:hover {
            cursor: pointer;
        }
    }
    @include e(btn-area) {
        flex: 1;
        width: 100%;
        margin-left: 20px;
        align-self: flex-end;
        text-align: right;
    }
}
@include b(radiobox-group) {
    @include flex($dir: row, $align: center, $justify: flex-start, $wrap: nowrap);
    @include e(item) {
        width: 30%;
        height: 40px;
        border-radius: 4px;
        border:1px solid $t-999;
        background-size: 90% 90%;
        background-repeat: no-repeat;
        background-position: center center;
        &:hover {
            cursor: pointer;
            border: 1px solid $base;

            &:last-of-type {
                border-left: 1px solid $base;
            }
        }
        &:first-of-type {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            background-image: url('../../../assets/imgs/alipay_s.png');
            background-size: 65% 65%;
        }
        &:last-of-type {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none;
            background-image: url('../../../assets/imgs/weixin_g.png');
            background-size: 80% 80%;
        }
    }
}
@include b(popover-content) {
    font-size: 14px;
    line-height: 28px;
}
@include when(danger){
    color: $danger;
}
@include when(pay-group-active) {
    border: 1px solid $base !important;
}
@include when(other) {
    vertical-align: middle;
    width: 23px;
    margin-left: 15px;
    &:hover {
        cursor: pointer;
    }
}

@include when(strong) {
    color: #f4b828;
}
</style>