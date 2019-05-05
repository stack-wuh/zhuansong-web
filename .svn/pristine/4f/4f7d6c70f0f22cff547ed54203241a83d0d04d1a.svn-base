<template>
    <section class='my-about-list'>
        <el-table :data="List" border stripe>
            <el-table-column align="center" label="职位名称" >
                <template slot-scope="scope">
                    <span @click="handleJump(scope.row)" class="my-about-list__name">{{scope.row.name}} >></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="职位类别" prop="type"></el-table-column>
            <el-table-column align="center" label="工作城市" prop="city"></el-table-column>
            <el-table-column align="center" label="发布时间" prop="time"></el-table-column>
        </el-table>
    </section>
</template>

<script>
 const List = [
     {
         name: 'Android高级开发工程师',
         type: '前端开发',
         city: '武汉',
         time: '2019-04-12'
     },
         {
         name: 'iOS高级开发工程师',
         type: '前端开发',
         city: '武汉',
         time: '2019-04-14'
     },
     {
         name: '市场部',
         type: '市场',
         city: '武汉',
         time: '2019-04-14'
     },
     {
         name: '互联网运营专员',
         type: '运营',
         city: '武汉',
         time: '2019-04-14'
     },
     {
         name: '城市运营经理',
         type: '运营',
         city: '武汉',
         time: '2019-04-14'
     },
     {
         name: '测试工程师',
         type: '技术',
         city: '武汉',
         time: '2019-04-14'
     },
     {
         name: '人事经理' ,
         type: '人事行政',
         city: '武汉',
         time: '2019-04-14'
     },
 ]
 export default{
    name: 'MyAboutList',
    components: {},
    props: {},
    watch: {},
    computed: {},
    data(){
        return {
            List
        }
    },
    methods: {
        handleJump(item) {
            this.$router.push({path: '/about/index'})
        }
    },
    created(){},
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/color.scss';
@import '@/assets/style/mixin.scss';
@include b(about-list) {
    padding-bottom: 20px;
    font-size: 15px !important;
    box-sizing: border-box;
    box-shadow: 0 4px 4px 4px #eee;
    border-radius: 4px;

    @include e(name) {
        &:hover {
            cursor: pointer;
            color: $base;
        }
    }
}
</style>