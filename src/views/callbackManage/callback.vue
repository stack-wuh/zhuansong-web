<template>
    <section class='my-callback-page'>
        <my-card-schame 
            v-loading="isShowLoading">
        </my-card-schame>
    </section>
</template>

<script>
 import {mapActions} from 'vuex'
 import MyCardSchame from '@/views/indexManage/schema/card'
 export default{
    name: 'MyCallbackPage',
    components: {
        MyCardSchame
    },
    props: {},
    watch: {},
    computed: {},
    data(){
        return {
            isShowLoading: true,
            timer: null
        }
    },
    methods: {
        ...mapActions(['GetOrderState']),
                /**
         * alipay
         * 获取订单状态信息
         */
        getOrderStatus (){
            let local = localStorage
            let info = local.getItem('local_order_info')
            let token = local.getItem('token')
            this.GetOrderState({
                token: JSON.parse(token).token,
                order_id: JSON.parse(info).data.order_id
            }).then(res => {
                let query = {}
                query = res.data.status >= 2 ? {status: 0} : {status: 1}
                this.timer = setTimeout(() => {
                    this.isShowLoading = false
                    this.$router.push({path: '/order', query})
                }, 2000)
            })
        },
    },
    created(){
        this.isShowLoading = true
        this.getOrderStatus()
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(callback-page) {
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
}
</style>