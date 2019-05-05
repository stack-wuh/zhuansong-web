<template>
    <section class='my-en-page'>
        <section class="my-en-banner">
            <img :src="ImgsPath.enBannerBg" alt="bg_en">
        </section>
        <my-card-schema>
            <section>
                <section class="my-en-card-list-header">
                    <h3 class="my-en-card-list-header__title">接单随时随地, 送单自由自在, 乐享轻松兼职</h3>
                    <p class="my-en-card-list-header__sub-title">Anyone, AnyWhere, Anytime</p>
                </section>
                <p class="my-en-card-list-title">如何成为专送员</p>
                <section class="my-en-card-list">
                <section class="my-en-card-list__item">
                    <section class="my-en-card-list__item--curmbs">
                        <div class="my-en-card-list__item--img-box">
                            <img :src="ImgsPath.enConStepOne" alt="i_logo">
                        </div>
                        <p class="my-en-card-list__item--title">扫码下载专送员App</p>
                        <div class="my-en-card-list__item--num-box">
                            <img :src="ImgsPath.enConStep1" alt="n_logo">
                        </div>
                    </section>
                </section>
                <section class="my-en-card-list__item">
                    <div class="my-en-card-list__item--right-box">
                        <img src="../../assets/imgs/en_right.png" alt="en_right">
                    </div>
                </section>
                <section class="my-en-card-list__item">
                        <section class="my-en-card-list__item--curmbs">
                        <div class="my-en-card-list__item--img-box">
                            <img :src="ImgsPath.enConStepTwo" alt="i_logo">
                        </div>
                        <p class="my-en-card-list__item--title">线上提交资料报名</p>
                        <div class="my-en-card-list__item--num-box">
                            <img :src="ImgsPath.enConStep2" alt="n_logo">
                        </div>
                    </section>
                </section>
                <section class="my-en-card-list__item">
                    <div class="my-en-card-list__item--right-box">
                        <img src="../../assets/imgs/en_right.png" alt="en_right">
                    </div>
                </section>
                <section class="my-en-card-list__item">
                        <section class="my-en-card-list__item--curmbs">
                        <div class="my-en-card-list__item--img-box">
                            <img :src="ImgsPath.enConStepThree" alt="i_logo">
                        </div>
                        <p class="my-en-card-list__item--title">线下培训后开始接单</p>
                        <div class="my-en-card-list__item--num-box">
                            <img :src="ImgsPath.enConStep3" alt="n_logo">
                        </div>
                    </section>
                </section>
                </section>
            </section>
        </my-card-schema>
        <my-card-schema>
            <section class="my-en-page-list">
                <section class="my-en-page-list__box my-en-page-list__lf">
                    <img :src="ImgsPath.enConPerson" alt="lf_logo">
                </section>
                <section class="my-en-page-list__box my-en-page-list__rg">
                    <p class="my-en-page-list__rg--title">招募要求</p>
                    <ul class="my-en-page-list__rg--list">
                       <li>年龄：18岁~45岁</li>
                       <li>支持GPS导航功能的手机一部</li>
                       <li>可装下文件封大小的背包或挎包</li>
                       <li>有电动车、摩托车或者汽车者优先</li>
                       <li>有快递、外卖配送经验者优先</li>
                       <li>具有良好的服务意识</li>
                    </ul>
                </section>
            </section>
        </my-card-schema>
    </section>
</template>

<script>
 import MyCardSchema from '@/views/dashboardManage/schema/listCard';
 import Scroll2Top from '@/mixins/scroll';
 import ImgsPath from '@/utils/imgsPath'
 export default{
    name: 'MyEnPage',
    components: {
        MyCardSchema
    },
    data(){
        return {
          ImgsPath,
        }
    },
    methods: {},
    created(){},
    mixins: [Scroll2Top]
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(en-card-list) {
    @include flex($dir: row, $justify: space-between, $align: stretch);
    height: 230px;
    padding: 60px 40px;

    @include e(item) {
        @include m(right-box) {
           flex: 1;
           height: 100%;
           @include flex($justify: center);
        }

        @include m(curmbs) {
            @include flex($dir: column, $align: center, $justify: space-between);
            height: 230px;
        }
        @include m(title) {
            font-size: 17px;
            color: #191919;
        }
        @include m(img-box) {
            width: 60px;
            max-height: 60px;
            overflow: hidden;
            & > img {
                width: auto;
                max-width: 100%;
            }
        }
    }
}
@include b(en-card-list-header) {
    height: 80px;
    margin-top: 90px;
    margin-bottom: 120px;
    line-height: 50px;
    text-align: center;

    @include e(title) {
        font-size: 32px;
        color: #191919;
    }
    @include e(sub-title) {
        font-size: 19px;
        font-weight: normal;
        font-family: Arial, Helvetica, sans-serif;
        color: #bebebe;
    }
}
@include b(en-page-list) {
    @include flex($dir: row, $justify: space-between, $align: stretch);
    height: 300px;
    padding: 40px 0 100px 0;
    @include e(box) {
        width: 50%;
    }
    @include e(lf) {
        box-sizing: border-box;
        & > img {
            width: auto;
            max-width: 100%;
        }
    }
    @include e(rg) {
        @include flex($dir: column, $justify: space-between);
        width: 40%;
        margin-left: 10%;
        padding: 15px 0;
        box-sizing: border-box;
        @include m(title) {
            padding-bottom: 20px;
            font-size: 24px;
            font-weight: 600;
            color: #141414;
            border-bottom: 7px solid #f1f1f1;
        }
        @include m(list) {
            padding: 15px 0;
            color: #787878;
            line-height: 2;
        }
    }
}
@include b(en-banner) {
 width: 100%;
 margin: 0 auto;
 text-align: center;
 overflow: hidden;
 & > img {
     width: auto;
     max-width: 100%;
 }
}

.my-en-card-list-title {
    margin-bottom: 70px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #191919;
}
</style>
