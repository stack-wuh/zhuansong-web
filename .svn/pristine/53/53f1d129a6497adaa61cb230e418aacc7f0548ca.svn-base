<template>
    <section class='my-dash-page'>
        <section class="my-dash-page__banner-box">
            <section class="my-dash-page__banner-content">
                <img class="my-dash-page__banner-content--index-phone" :src="ImgList.dashBannerPhone" alt="index_phone">
                <section class="my-dash-page__banner-content--index-rg">
                  <img class="my-dash-page__banner-content--index-text" :src="ImgList.dashBannerText" alt="index_text">
                  <ul class="index-rg__list">
                      <li class="index-rg__list--title"><span>用户端</span></li>
                      <li class="index-rg__list--item">
                          <div>
                              <img src="../../assets/imgs/icon_wechat.png" alt="icon_wechat">
                              <span>微信小程序</span>

                              <div class="index-rg__list--item-qr">
                                <img src="../../assets/imgs/index/miniapp.png" alt="miniapp">
                              </div>
                          </div>
                      </li>
                      <li class="index-rg__list--title">
                          <span>专送员端</span>
                      </li>
                      <li class="index-rg__list--item">
                          <div>
                              <img src="../../assets/imgs/icon_ios.png" alt="icon_ios">
                              <span>iOS</span>

                              <div class="index-rg__list--item-qr">
                                <img src="../../assets/imgs/index/ios.png" alt="ios">
                              </div>
                          </div>
                          <div>
                              <img src="../../assets/imgs/icon_android.png" alt="icon_android">
                              <span>Android</span>

                              <div class="index-rg__list--item-qr">
                                <img src="../../assets/imgs/index/android.png" alt="android">
                              </div>
                          </div>
                      </li>
                  </ul>
                </section>
            </section>
        </section>

        <my-list-card-schema >
            <my-list-card-item>
            </my-list-card-item>
        </my-list-card-schema>

        <my-list-card-schema>
            <my-cm-list></my-cm-list>
        </my-list-card-schema>
    </section>
</template>

<script>
 import MyListCardSchema from '@/views/dashboardManage/schema/listCard';
 import MyListCardItem from './child/card'
 import MyCmList from './child/list'
 import ImgList from '@/utils/imgsPath'
 export default{
    name: 'Dashboard',
    components: {
        MyListCardSchema,
        MyListCardItem,
        MyCmList
    },
    provide: {
      imgs: ImgList
    },
    data(){
        return {
          ImgList,
        }
    },
    methods: {},
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(dash-page) {
    width: inherit;
    height: auto;
    overflow: hidden;

    @include e(banner-box) {
        width: 100%;
        height: 550px;
        overflow: hidden;
        background-image: url('../../assets/imgs/index_banner.png');
        background-size: 100% 100%;
        background-position: center center;
    }
    @include e(banner-content) {
      position: relative;
      width: 100%;
      height: 100%;
      min-width: 980px;
      max-width: 1200px;
      margin: 0 auto;

      @include m(index-phone) {
        position: absolute;
        width: 310px;
        height: 550px;
        left: 20%;
      }
      @include m(index-rg) {
        position: absolute;
        left: 50%;
        width: 100%;
        height: 100%;
        color: #fff;

        & .index-rg__list {
            position: absolute;
            width: 350px;
            top: 45%;
            &--title {
                margin-bottom: 20px;
            }
            &--item {
                @include flex($dir: row, $align: center);
                margin-bottom: 50px;
                & > div{
                  position: relative;
                    @include flex($dir: row, $align:center);
                    width: 155px;
                    height: 45px;
                    margin-right: 20px;
                    padding: 15px 20px;
                    border: 1px solid #fff;
                    border-radius: 4px;
                    box-sizing: border-box;

                    & > img {
                        margin-right: 15px;
                    }

                    & > span {
                        word-break: keep-all;
                    }

                    &:hover {
                        cursor: pointer;

                        & > .index-rg__list--item-qr {
                          opacity: 1;
                          left: 120%;
                          transform: scale3d(1, 1, 1);
                          transition: opacity 1s ease, left .5s ease, transform .5s;
                          z-index: 1000 !important;
                        }
                    }
                }
                & .index-rg__list--item-qr {
                  position: absolute;
                  left: 0;
                  opacity: 0;
                  transform: scale3d(0, 0, 0);
                  z-index: -1000 !important;
                }
            }
            .index-rg__list--item:last-of-type {
                margin-bottom: 0;
            }
        }
      }
      @include m(index-text) {
        position: absolute;
        top: 6%;
      }
    }
}
</style>
