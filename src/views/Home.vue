<template>
  <section class="my-home">
    <section class="my-page-home">
        <my-header></my-header>
        <section class="my-router-content">
          <router-view></router-view>
        </section>
        <my-footer></my-footer>
    </section>
  </section>
</template>

<script>
import MyHeader from '@/components/nav/header'
import MyFooter from '@/components/nav/footer'


export default {
  name: 'home',
  components: {
    MyHeader,
    MyFooter,
  },
  data(){
    return{}
  },
  methods: {},
  created(){},
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
@include b(router-content) {
  min-height: calc(100vh - 375px - 80px);
}
</style>
