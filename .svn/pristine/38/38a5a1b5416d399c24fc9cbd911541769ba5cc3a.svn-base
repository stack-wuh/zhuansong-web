<template>
    <section class='my-download-page'>
        <section
             @click="wxOpen = false"
             v-if="wxOpen"
             class="my-download-page__img-box">
        </section>
        <section class="my-download-page__bg-box">
          <img class="my-download-page__bg-box--bg-img" src="../../assets/imgs/mobile/bg_group.png" alt="bg-group">
          <img class="my-download-page__bg-box--dl-qr" src="../../assets/imgs/mobile/dl_qr.png" alt="dl_qr">
          <img class="my-download-page__bg-box--dl-text" src="../../assets/imgs/mobile/dl_text.png" alt="dl_text">
          <section class="my-download-page__bg-box--btn-area">
              <section @click="handleClick" class="my-download-page__btn-area--box">
                  <img @click="handleClick" v-if="isShowBtn" :src="btnImgs[0]" alt="ios">
                  <img @click="handleClick" v-else :src="btnImgs[1]" alt="ios">
              </section>
          </section>
        </section>
    </section>
</template>

<script>
 import axios from 'axios'
 const btnImgs = [
     'https://res.squrab.com/web/download/btn_ios.png',
     'https://res.squrab.com/web/download/btn_android.png'
 ]
 export default{
    name: 'MyDownload',
    data(){
        return {
            isShowBtn: 1,
            btnImgs,
            reLoadUrl: '',
            wxOpen: false
        }
    },
    methods: {
        getUserAgent(){
            axios({
                method: 'get',
                url: 'https://asapi.squrab.com/api/app/url'
            }).then(res => {
                let {info, list} = res.data.data
                if(info.Mobile && info.Version.toLocaleLowerCase() == 'ios') {
                    this.isShowBtn = 1
                    this.reLoadUrl = list.app.find(kk => kk.app_type == 7).download_path
                }else if(info.Mobile && info.Version.toLocaleLowerCase() == 'android') {
                    this.isShowBtn = 0
                    this.reLoadUrl = list.app.find(kk => kk.app_type == 6).download_path
                }
            })
        },
        handleClick(){
            let userAgent = window.navigator.userAgent.toLowerCase()
            if(userAgent.match(/MicroMessenger/i) == 'micromessenger') {
                this.wxOpen = true
            }else {
                window.location.href = this.reLoadUrl
            }
        },
    },
    created(){
        this.getUserAgent()
    },
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';

@include b(download-page) {
    position: relative;
    width: 100%;
    height: 100%;

    @include e(img-box) {
      width: 100%;
      height: 100%;
      background-image: url('https://res.squrab.com/download/wechat-ua.png');
      background-size: 100% 100%;
      background-position: center center;
    }

    @include e(bg-box) {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      @include m(bg-img){
        width: 100%;
        padding-top: 1.4rem;
      }
      @include m(dl-qr) {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 165px;
        height: 50px;
      }
      @include m(dl-text) {
        position: absolute;
        width: 220px;
        height: 60px;
        left: 50%;
        bottom: 15vh;
        transform: translateX(-50%);
      }
      @include m(btn-area) {
        position: absolute;
        bottom: 3vh;
        left: 50%;
        width: 80vw;
        height: 10vh;
        transform: translateX(-50%);
        z-index: 10000 !important;
        &  img {
          width: auto;
          max-width: 100%;
        }
      }
    }
}

</style>
