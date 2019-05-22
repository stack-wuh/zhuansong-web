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
                     <p class="is-art__text">方兔网络成立于2018年9月，位于湖北省武汉市武昌区。公司由北上广深有着丰富从业经验的互联网成员创立，连续多年创业经验，团队优秀，办公环境优越。项目涉及O2O同城服务，物流体系搭建，无人配送等。</p>
                     <p class="is-art__text">方兔网络专注同城物流配送等相关服务，推出了“专送Pro”品牌，主要为客户提供“帮送、帮取、帮买”，同城一小时专人直送服务，目前开放了武汉、长沙及周边城市的运营。</p>
                     <p class="is-art__text">公司目前团队成员80人，团队技术负责人和骨干，均来自于BAT企业，有“独角兽”级别互联网项目经验，技术实力强大，项目经验丰富，团队激情、活跃，办公环境愉悦轻松。</p>
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
