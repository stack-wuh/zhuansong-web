<template>
    <section class='my-cm-list-page'>
         <section
            v-for="(item, index) in List"
            :key="index"
            class="my-cm-list-card"
            :class="['my-cm-list-card'+index]">
             <section class="my-cm-list-card__lf">
               <img v-if="index == 0" :src="imgs.dashConPerson1" alt="list_logo">
               <img v-if="index == 1" :src="imgs.dashConPhone" alt="list_logo">
               <img v-if="index == 2" :src="imgs.dashConPerson2" alt="list_logo">
                 <!-- <img :src="item.img" alt="list_logo"> -->
             </section>
             <section class="my-cm-list-card__rg">
                 <h4 class="my-cm-list-card__rg--title">{{item.label}}</h4>
                 <article class="my-cm-list-card__rg--art" v-html="item.tips"></article>
                 <el-button @click="$router.push({path: '/index'})" class="my-cm-list-card__rg--btn" v-if="index == 1">在线下单</el-button>
                 <el-button @click="$router.push({path: '/enlist'})" class="my-cm-list-card__rg--btn" v-if="index == 2">成为专送员</el-button>
             </section>
         </section>
         <!-- <span @click="scrollToTop" class="el-icon-upload2 my-cm-list-btn"></span> -->
    </section>
</template>

<script>
 const List = [
     {
         label: '什么是专送Pro',
         tips: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;针对城市人群和企业服务，解决日常中“帮买、帮送、帮取、帮排队”等</br>问题。通过劳动共享，众包模式去解决同城快递和跑腿行业的低效和不规范，提供最安全、专业的城市即时配送服务',
         img: require('@/assets/imgs/dash_person1.png')
     },
     {
         label: '如何下单',
         tips: `
            <ul class="my-cm-list--tips">
                <li class="my-cm-list--tips__item">登陆专送官网, 即可在线下单</li>
                <li class="my-cm-list--tips__item">在应用商店搜索“专送Pro”, 下载“专送Pro”APP，直接下单</li>
                <li class="my-cm-list--tips__item">在微信搜索“专送Pro”, 微信小程序下单</li>
            </ul>
            `,
         img: require('@/assets/imgs/dash_phone.png')
     },
     {
         label: '加入跑单',
         tips: '时间自由，兼职、专职都能跑</br>订单轻松，赚钱简单</br>无门槛加入，收入轻松过万',
         img: require('@/assets/imgs/dash_person2.png')
     }
 ]
 export default{
    name: 'MyCmList',
    inject: ['imgs'],
    data(){
        return {
            List,
            // imgs: this.imgs
        }
    },
    methods: {
        scrollToTop(){
            var otop = document.body.scrollTop || document.documentElement.scrollTop
            otop = document.body.scrollTop = document.documentElement.scrollTop -= 150
            if(otop > 0) {
                requestAnimationFrame(this.scrollToTop)
            }
        }
    },
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/color.scss';
@include b(cm-list-page) {
    position: relative;
    width: inherit;
    height: auto;
    margin-bottom: 120px;
    box-sizing: border-box;
}
@include b(cm-list-card) {
    @include flex($dir: row, $justify: space-between, $align: stretch);

    @include e(lf) {
        width: 50%;
        & > img {
            width: auto;
            max-width: 100%;
        }
    }
    @include e(rg) {
        @include flex($dir: column, $justify: space-between);
        order: 1;
        width: 50%;
        padding: 60px 0;
        box-sizing: border-box;

        @include m(title) {
            width: 100%;
            text-align: center;
            @include text-wp{
                @extend .card-title;
                color: #828282;
                font-weight: 600 !important;
                font-size: 27px !important;
            }
        }

        @include m(art) {
            @include text-wp {
                @extend .card-article;
                font-size: 17px !important;
                color: #636363 !important;
            }
        }

        @include m(btn) {
            width: 190px;
            height: 50px;
            margin: 0 auto;
            background-color: $base;
            color: $t-white;
            font-size: 17px;
            border-radius: 4px;
        }
    }
}

@include b(cm-list-btn) {
  position: absolute;
  right: -10%;
  bottom: 0;
  width: 40px;
  height: 40px;
  font-size: 35px;
  color: $t-white;
  text-align: center;
  background-color: #eee;
  border-radius: 40%;

  &:hover {
      cursor: pointer;
  }
}

@each $index in 0,1,2 {
    .my-cm-list-card#{$index} {
        @if($index == 0) {
            .my-cm-list-card__lf {
                width: 460px;
                height: 305px;
                overflow: hidden;
            }
        } @else if ($index == 1) {
            .my-cm-list-card__lf{
                width: 610px;
                height: 495px;
                order: 2;
                overflow: hidden;
            }
            .my-cm-list-card__rg{
                width: 60%;
                padding-top: 125px;
                padding-bottom: 90px;
                &--title {
                    padding-left: 25%;
                    text-align: left;
                }
                &--btn {
                    margin-left: 18%;
                }
            }
        }@else {
            .my-cm-list-card__rg {
                padding: 20px 0;
                &--art {
                    margin: 0 auto;
                }
            }
        }
    }
}

.card-article {
    line-height: 2;
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
