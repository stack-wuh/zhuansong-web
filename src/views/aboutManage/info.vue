<template>
    <section class='my-about-info'>
        <my-list-card-schema class="about-info-box about-info-box0">
            <section class="my-ab-info-top">
                <h3 class="my-ab-info-top__title">{{info.port}}</h3>
                <p class="my-ab-info-top__money">{{info.price}}</p>
            </section>
        </my-list-card-schema>

        <my-list-card-schema class="about-info-box">
            <section class="my-ab-info-box">
                <!-- <section
                    v-for="(item, index) in List"
                    :key="index"
                    class="my-ab-info-box__item">
                    <p class="my-ab-info-box__item--title">{{item.label}}</p>
                    <article class="my-ab-info-box__item--article" v-html="item.content"></article>
                </section> -->
                <section v-if="info.desc" class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">岗位职责</p>
                  <article class="my-ab-info-box__item--article" v-html="info.desc"></article>
                </section>
                <section v-if="info.way" class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">工作方式</p>
                  <article class="my-ab-info-box__item--article" v-html="info.way"></article>
                </section>
                <section v-if="info.reply" class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">报名方式</p>
                  <article class="my-ab-info-box__item--article" v-html="info.reply"></article>
                </section>
                <section v-if="info.report" class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">收益</p>
                  <article class="my-ab-info-box__item--article" v-html="info.report"></article>
                </section>
                <section v-if="info.express" class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">递送</p>
                  <article class="my-ab-info-box__item--article" v-html="info.express"></article>
                </section>
                <section class="my-ab-info-box__item">
                  <p class="my-ab-info-box__item--title">岗位要求</p>
                  <article class="my-ab-info-box__item--article" v-html="info.require"></article>
                </section>
            </section>
        </my-list-card-schema>
    </section>
</template>

<script>
 import Scroll2Top from '@/mixins/scroll';
 import MyListCardSchema from '@/views/dashboardManage/schema/listCard';
 import {mapMutations, mapState} from 'vuex'
 export default{
    name: 'MyAboutInfo',
    components: {
        MyListCardSchema
    },
    computed: {
      ...mapState({
        info: state => state.Port.info
      })
    },
    data(){
        return {}
    },
    methods: {
      ...mapMutations(['GET_TABLE_LIST_INFO'])
    },
    created(){
      this.GET_TABLE_LIST_INFO(this.$route.query.id)
    },
    mixins: [Scroll2Top]
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/color.scss';
@include b(about-info) {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    overflow: hidden;
    background-color: #F7F5F5;
}
@include b(ab-info-top){
   @include e(title) {
       font-size: 24px;
       line-height: 30px;
       font-stretch: normal;
       color: #1a1a1a;
   }
   @include e(money) {
       font-size: 20px;
       letter-spacing: 1px;
       color: #1a1a1a;
   }
}

@include b(ab-info-box) {
   @include e(item) {
       margin-bottom: 65px;

       @include m(title) {
           position: relative;
           margin-bottom: 30px;
           padding-left: 10px;
           font-size: 18px;
           font-weight: 600;
           font-stretch: normal;
           color: #1a1a1a;

           &::before {
               position: absolute;
               left: -8px;
               content: '';
               padding: 12px 3px;
               border-radius: 4px;
               background-color: $base;
           }
       }
       @include m(article) {
           font-size: 16px;
           line-height: 30px;
           font-stretch: normal;
       }
       &:last-of-type {
           margin-bottom: 0;
       }
   }
}

.about-info-box {
    padding: 60px 50px;
    background-color: #fff;
    box-shadow: 0 4px 4px 2px #eee;
    border-radius: 4px;
    box-sizing: border-box;
}
.about-info-box0 {
    padding-bottom: 30px;
    margin-bottom: 20px;
    margin-top: 20px;
    max-height: 148px;
    line-height: 2;
}
</style>
