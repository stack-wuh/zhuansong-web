<template>
    <section class='my-cm-order-info'>
        <slot></slot>
    </section>
</template>

<script>
 export default{
    name: 'MyOrderBox',
    components: {},
    provide: {},
    props: {},
    watch: {},
    computed: {},
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
@include b(cm-order-info) {
    flex: 1;
    max-height: 400px;
    margin-right: 15px;
}
</style>