<template>
    <section class='my-pay-index'>
       <my-card-schema>
           <section class="my-pay">
               <section class="my-pay__lf">
                   <img :src="orderInfo.img" alt="logo">
               </section>
               <section class="my-pay__rg">
                   <h3 class="my-pay__rg--title">{{orderInfo.title}}</h3>
                   <p class="my-pay__rg--tips">{{orderInfo.tips}}</p>
                   <section class="my-pay__rg-btn-box">
                        <el-button 
                            @click="handleClick(orderInfo.type)"
                            class="my-pay__rg-btn-box--btn">{{orderInfo.btnText}}
                        </el-button>  
                        <el-button @click="handleJump" v-if="orderInfo.type == 1">返回上一页</el-button>
                   </section>

               </section>
           </section>
       </my-card-schema>
       <el-dialog
        class="my-order-dialog-box"
        :visible.sync="visibleDialog"
        :modal="false">
            <section class="my-order-dialog">
                <h3 class="my-order-dialog__title">专送Pro小程序</h3>
                <section class="my-order-dialog__img-box">
                    <img :src="QrMiniAppImg" alt="qrcode">
                </section>
                <p class="my-order-dialog__tips">使用微信扫码进小程序查看订单管理</p>
            </section>
        </el-dialog>
    </section>
</template>

<script>
 import MyCardSchema from  '@/views/indexManage/schema/card';
 const PayStatusImgSuccess = require('@/assets/imgs/pay_ok.png')
 const PayStatusImgError = require('@/assets/imgs/pay_error.png')
 const QrMiniAppImg = require('@/assets/imgs/weixin_qr.png')
 const OrderStatusList = [
     {
         img: PayStatusImgSuccess,
         title: '您已付款成功!',
         tips: '订单已成功支付! 专送员正火速赶来~',
         btnText: '查看订单',
         type: 1,
         click: 'handleClickCheckOrder'
     },
     {
         img: PayStatusImgError,
         title: '支付失败!',
         tips: '很抱歉, 支付失败! 如仍需要服务请重新支付~',
         btnText: '重新支付',
         type: 2,
         click: 'handleClickRepay'
     }
 ]
 export default{
    name: 'MyOrderIndex',
    components: {
        MyCardSchema
    },
    props: {},
    watch: {},
    computed: {
        orderInfo(){
            return this.OrderStatusList[this.query.status || 0]
        },
        query(){
            return this.$route.query
        }
    },
    data(){
        return {
           PayStatusImgSuccess,
           PayStatusImgError,
           OrderStatusList,
           QrMiniAppImg,
           visibleDialog: false
        }
    },
    methods: {
        handleClickCheckOrder(){
            this.visibleDialog = true
        },
        handleClickRepay(){
            this.$router.push({path: '/index', query: {status: 2}})
        },
        handleClick(e){
            if(e == 1) {
                this.handleClickCheckOrder()
            }else {
                this.handleClickRepay()
            }
        },
        handleJump(){
            this.$router.push({path: '/index', query: {status: 1}})
        }
    },
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';

@include b(pay-index) {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
@include b(pay) {
    @include flex($dir: row, $wrap: nowrap, $align: stretch);
    width: 100%;
    height: 200px;
    padding-left: 30px;
    margin-top: 20px;
    box-sizing: border-box;

    @include e(lf) {
        flex: .1;
        & > img {
            width: auto;
            max-width: 100%;
        }
    }
    @include e(rg) {
        @include flex($dir: column, $justify: space-between);
        flex: .7;

        @include m(title) {
            margin-bottom: 20px;
            font-size: 18px;
            font-family: PingFang-SC-Medium;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #262626;
        }

        @include m(tips){
            flex: 1;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-stretch: normal;
            user-select: none;
            color: #474747;
        }
    }

    @include e(rg-btn-box) {
        width: 100%;

         @include m(btn) {
            background-color: #1fa2ff;
            color: #fff;
        }
    }
}


@include b(order-dialog) {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    @include e(title){
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-stretch: normal;
        color: #1c1c1c;
        text-align: center;
    }

    @include e(tips) {
        font-size: 14px;
        font-stretch: normal;
        color: #3d3d3d;
        text-align: center;
    }

    @include e(img-box) {
        margin: 20px auto;
        padding: 20px 0;
        text-align: center;
        overflow: hidden;
        & > img {
            width: auto;
            max-width: 100%;
        }
    }
}
</style>