<template>
    <section class='my-cm-card'>
        <div
            v-if="!mult" 
            class="my-card-container">
                <slot></slot>
        </div>
        <div 
            v-else
            class="my-card-container-mult">
            <slot></slot>
        </div>
    </section>
</template>

<script>
 export default{
    name: 'myCmCard',
    components: {},
    props: {
        mult: {
            type: Boolean,
            default: false
        }
    },
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
@include b(cm-card) {
    max-width: 1200px;
    min-height: 280px;
    margin: 0 auto;
    margin-bottom: 15px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 4px 4px #eee;
    box-sizing: border-box;

    @include b(card-container) {
        @include flex($dir: column, $justify: center);
        width: inherit;
        height: 100%;
        min-height: 280px;
    }

    @include b(card-container-mult) {
        @include flex($dir: row, $justify: space-between, $align: stretch);
        width: inherit;
        max-height: 480px;
    }
}
</style>