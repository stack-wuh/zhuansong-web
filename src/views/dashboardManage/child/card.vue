<template>
    <section class='my-cm-card'>
        <section class="my-card-list">
            <section
                v-for="(item, index) in List"
                :key="index"
                class="my-card-item">
                <section class="my-card-item__img-box">
                    <img :src="item.icon" alt="logo">
                </section>
                <h4 class="my-card-item__title">{{item.label}}</h4>
                <article class="my-card-item__art" v-html="item.tips"></article>
            </section>
        </section>
    </section>
</template>

<script>
 const List = [
     {
         label: '代送',
         tips: '1小时内的全城极速送达服务</br>安全保障&nbsp;平台保障',
         icon: require('@/assets/imgs/daisong.png')
     },
    {
         label: '代取',
         tips: '随时随地的代取服务</br>让生活更便利',
         icon: require('@/assets/imgs/daiqu.png')
     },
     {
         label: '代买',
         tips: '辐射全城的代买服务</br>只有想不到的&nbsp;没有买不到的',
         icon: require('@/assets/imgs/daimai.png')
     },
     {
         label: '代排队',
         tips: '最有温度的代排队服务</br>办事排队&nbsp;餐厅占座&nbsp;下单即排',
         icon: require('@/assets/imgs/paidui.png')
     }
 ]
 export default{
    name: 'MyCmCard',
    data(){
        return {
            List
        }
    },
    methods: {},
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/var.scss';
@include b(card-list) {
    @include flex($dir: row, $align: stretch, $justify: space-between);
    width: 100%;
    height: 340px;
    padding: 40px 0;
}
@include b(card-item) {
    @include flex($dir: column, $align: center, $justify: space-between);
    width: 20%;
    @include e(img-box) {
        width: 151px;
        height: 151px;
        overflow: hidden;
        & > img {
            width: auto;
            max-width: 100%;
            transform: scale3d(.9, .9, .9);
        }
    }

    @include e(title) {
        margin-bottom: -20px;
        @extend .card-title;
        font-size: 22px !important;
        font-weight: 600 !important;
    }
    @include e(art) {
        flex: .6;
        text-align: center;
        @include text-wp{
            @extend .card-article;
            font-size: 15px !important;
            line-height: 30px;
        }
    }
}

@include b(cm-card){
    margin: 50px 0  40px 0;
}
.card-article {
    font-size: 18px;
    color: #828282;
    @include text-wp;
}
.card-title {
    font-size: 30px;
    color: #0f0f0f;
    @include text-wp;
}

</style>
