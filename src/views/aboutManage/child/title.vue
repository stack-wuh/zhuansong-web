<template>
    <section class='my-ab-title'>
        <header class="my-ab-title__header">
            <h4 class="my-ab-title__header--title">{{data.title}}</h4>
            <p class="my-ab-title__header--sub-title">{{data.subTitle}}</p>
            <div 
                class="my-ab-title__header--bg-img"
                :class="['my-ab-title__header--' + data.imgPos]">
                <img :src="data.img" alt="bg-img">
            </div>
            <slot></slot>
        </header>
    </section>
</template>

<script>
 export default{
    name: 'MyAboutItemTitle',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
        }
    },
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(ab-title) {
    position: relative;
    width: 100%;
    height: 200px;
    box-sizing: border-box;

    @include e(header) {
        padding-top: 50px;
        text-align: center;
        @include m(title) {
            @include text-title;
        }
        
        @include m(sub-title) {
            @include text-sub_title{
                font-weight: normal !important;
                font-size: 19px !important;
            }
        }

        @include m(bg-img) {
            position: absolute;
            top: 0;
            & > img {
                width: auto;
                max-width: 100%;
            }
        }
        @include m(left) {
            left: 0;
        }
        @include m(right) {
            right: 0;
        }
    }

}
</style>