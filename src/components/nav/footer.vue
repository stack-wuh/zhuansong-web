<template>
  <section class='my-cm-footer'>
    <section class="my-ft-top">
      <section class="my-ft-top__lf">
        <section class="my-ft-top__lf-img-box">
          <img src="../../assets/imgs/bm_logo.png" alt="bm_logo">
        </section>
        <h5 class="my-ft-top__lf--title">联系我们</h5>
        <p class="my-ft-top__lf--art">电话: 4008-588-855</p>
        <p class="my-ft-top__lf--art">地址: 武汉市武昌区和平大道绿地金融城&nbsp;&nbsp;&nbsp;绿地楚峰大厦1401-1412室</p>
      </section>
      <section class="my-ft-top__rg">
        <section class="my-ft-top__rg--img-box">
          <img :src="ImgsPath.footerQrH5" alt="qr_logo">
          <p class="my-ft-top__rg--tips">专送Pro微信服务号</p>
        </section>
        <section class="my-ft-top__rg--img-box">
          <img :src="ImgsPath.footerQrMiniapp" alt="qr_logo">
          <p class="my-ft-top__rg--tips">专送Pro小程序</p>
        </section>
      </section>
    </section>
    <section class="my-ft-bottom">
      <small class="my-ft-bottom__copyright">
        专送Pro&nbsp; www.zhuansong.pro 版权所有: 武汉方兔网络科技有限公司@2018-2019 鄂ICP备18028038号-2
      </small>
       <!-- <small class="my-ft-bottom__copyright">Copyright©2018-2019&nbsp;&nbsp;&nbsp;www.zhuansong.pro All Rights Reserved.&nbsp;&nbsp;&nbsp;&nbsp;鄂ICP备18028038号-2</small> -->
    </section>
  </section>
</template>

<script>
 import ImgsPath from '@/utils/imgsPath'
 export default{
  name: 'MyLayout',
  data(){
    return {
      ImgsPath
    }
  },
  methods: {},
  created(){},
  mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(cm-footer) {
  width: inherit;
  height: auto;
  max-height: 374px;
  background-color: #d4d4d4;
}

@include b(ft-bottom) {
  width: inherit;
  height: 60px;
  text-align: center;
  background-color: #393939;

  @include e(copyright) {
    line-height: 60px;
    font-size: 14px;
    @include text-wp(){
      color: #acabab;
    }
  }
}

@include b(ft-top) {
  @include flex($dir: row, $justify: space-between, $wrap: nowrap);
  width: inherit;
  height: auto;
  max-height: calc(374px - 60px);
  min-width: 980px;
  max-width: 1200px;
  padding: 70px 0;
  margin: 0 auto;
  box-sizing: border-box;

  @include e(lf){
    width: 65%;

    @include m(title) {
      margin-top: 50px;
      margin-bottom: 20px;
      @include text-wp {
        font-size: 17px;
        font-weight: bold;
        color: #1b1b1b;
      }
    }

    @include m(art) {
      @include text-wp{
        font-size: 15px !important;
        color: #2f2f2f;
        line-height: 2;
      }
    }
  }
  @include e(rg){
    @include flex($dir: row, $justify: space-between);
    width: 30%;
    margin-left: 5%;

    @include m(img-box) {
      width: 142px;
      height: 142px;

      & > img {
        width: auto;
        max-width: 100%;
      }
    }
    @include m(tips) {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
