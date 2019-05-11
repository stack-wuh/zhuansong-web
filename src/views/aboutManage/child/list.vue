<template>
    <section class='my-about-list'>
        <el-table :data="dataList" border stripe>
            <el-table-column align="center" label="职位名称" >
                <template slot-scope="scope">
                    <span @click="handleJump(scope.row)" class="my-about-list__name">{{scope.row.port}} >></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="职位类别" prop="type"></el-table-column>
            <el-table-column align="center" label="工作城市" prop="city"></el-table-column>
            <el-table-column align="center" label="发布时间" prop="time"></el-table-column>
        </el-table>
    </section>
</template>

<script>
 import {mapMutations, mapState} from 'vuex'
 export default{
    name: 'MyAboutList',
    components: {},
    props: {},
    watch: {},
    computed: {
      ...mapState({
        dataList: state => state.Port.data
      })
    },
    data(){
        return {}
    },
    methods: {
        ...mapMutations(['GET_TABLE_LIST']),
        handleJump(item) {
            this.$router.push({path: '/about/index', query: {id: item.id}})
        },

    },
    created(){
      this.GET_TABLE_LIST()
    },
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
