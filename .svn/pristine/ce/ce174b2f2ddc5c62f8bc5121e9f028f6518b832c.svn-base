<template>
    <section class='my-about-page'>
        <section class="my-about-page__banner">
            <img :src="ImgsPaths.abBannerBg" alt="ab_banner">
        </section>
        <section class="my-about-page__art">
            <my-list-card-schema
                v-for="(item, index) in List"
                :key="index"
                :class="['my-card-schema'+index]">
                <my-list-card-item-title
                 :data="item">
                 <div v-if="index == 1" class="my-card-schema__tips">简历投递方式: hr@squrab.com</div>
                </my-list-card-item-title>
                 <article v-if="index == 0" class="my-about-page__art--article">
                     <p class="is-art__text">方兔网络成立于2018年9月，位于湖北省武汉市武昌区。公司由根植于互联网行业多年的成员创立，立足武汉，辐射周边省市，主营业务包括互联网软件、游戏开发，O2O同城服务，物流体系搭建，无人配送等。</p>
                     <p class="is-art__text">方兔网络专注同城物流配送等相关服务，推出了“专送Pro”等相关信息服务平台。“专送Pro”针对城市人群和企业服务，解决日常中“帮买、帮送、帮取、帮排队”等问题。“方兔速运”针对城市物流中，叫车难，价格不规范，服务品质差等问题，充分结合物流行业特征，打造了服务于物流园、大小型商户、以及C端用户市场的信息服务平台，带来了同城物流标准化运营，服务型体验的全新物流配送模式，同时引入众包模式，让闲置运力充分发挥效能，更让企业运力合理调配。</p>
                 </article>
                 <my-list-card-data v-else>
                 </my-list-card-data>
            </my-list-card-schema>
        </section>
    </section>
</template>

<script>
 import MyListCardSchema from '@/views/dashboardManage/schema/listCard';
 import MyListCardItemTitle from './child/title'
 import MyListCardData from './child/list'
 import ImgsPaths from '@/utils/imgsPath'
 const List = [
     {
         title: '方兔网络',
         subTitle: 'Squrab Network',
         img: require('@/assets/imgs/ab_1.png'),
         imgPos: 'right',
     },
     {
         title: '招聘信息',
         subTitle: 'Jobs',
         img: require('@/assets/imgs/ab_2.png'),
         imgPos: 'left'
     }
 ]
 export default{
    name: 'MyAboutPage',
    components: {
        MyListCardSchema,
        MyListCardItemTitle,
        MyListCardData
    },
    data(){
        return {
            List,
            ImgsPaths
        }
    },
    methods: {},
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(about-page) {
    width: inherit;
    height: auto;

    @include e(banner) {
       width: 100%;
       margin: 0 auto;
       text-align: center;
       overflow: hidden;

       & > img {
           width: auto;
           max-width: 100%;
       }
    }

    @include e(art) {
        padding: 40px 0;
    }
}
@include b(card-schema1) {
   margin-top: 80px;
}
@include b(card-schema) {
    @include e(tips) {
        font-weight: 600;
        text-align: right;
        color: #292929;
    }
}
@include when (art__text) {
    @include text-art;
    text-indent: 34px;
    line-height: 34px;
}
</style>
