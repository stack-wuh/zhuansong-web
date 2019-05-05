<template>
    <section class='my-cm-list-card'>
        <slot></slot>
    </section>
</template>

<script>
 export default{
    name: 'MyListCard',
    data(){
        return {
        }
    },
    methods: {},
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(cm-list-card) {
    width: 100%;
    min-width: 980px;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
}
</style>