<template>
    <section class='my-card-location'>
        <el-form
            class="my-card-form" 
            ref="myOrderForm" 
            :model="temp_form" 
            label-width="120px">
                <el-form-item 
                    v-for="(item, index) in list" 
                    :key="index"
                    :label="item.label"
                    :prop="item.field"
                    :rules="item.rule">
                    <template v-if="item.type == 'inputsearch'">
                        <el-autocomplete
                            class="my-card-form__auto-complete"
                            :debounce="DECOUNCE"
                            highlight-first-item
                            clearable
                            :placeholder="item.placeholder"
                            @clear="handleInputAutoChange(item.field)"
                            v-model="temp_form[item.field]"
                            :fetch-suggestions="(string, cb) => {return  handleInputChange(item.field, string, cb)}"
                            :trigger-on-focus="false"
                            @select="(e) => {return $parent.$parent.handleSelect(e, item)}">
                        </el-autocomplete>
                    </template>
                    <template v-else>
                        <el-input
                            clearable
                            class="my-card-form__input"
                            v-model="temp_form[item.field]" 
                            :placeholder="item.placeholder"
                        ></el-input>
                    </template>
                </el-form-item>
        </el-form>
    </section>
</template>

<script>
 const DECOUNCE = 500
 import {Toast} from '@/utils/global'
 import {mapMutations, mapActions} from 'vuex'
 export default{
    name: 'MyCardLocation',
    components: {},
    inject: ['Toast'],
    props: {
        list: {
            type: Array,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
        formObj: {
            type: Object,
            required: false
        }
    },
    watch: {

    },
    computed: {},
    data(){
        return {
            DECOUNCE,
            temp_form: {}, // 作为临时储存表单对象
        }
    },
    methods: {
        ...mapMutations(['SET_ORDER_FORM_STATUS']),
        ...mapActions(['SetOrderFormStatus']),
        handleInputAutoChange(e) {
           if(e == 'temp_send') {
               this.$parent.$parent.$data.mapService.removeMarker('起点')
           }
           if(e == 'temp_receive') {
               this.$parent.$parent.$data.mapService.removeMarker('终点')
           }
        },
        /**
         * 定义inputsearch的搜索change事件
         */
        handleInputChange(type, string, cb){
            let _obj = {
                key: string,
                pageSize: 10,
                pageIndex: 1
            }
            this.$parent.$parent.$data.mapService.searchByKeyword(_obj)
                .then(res => {
                    let temp_arr = res.pois.map(kk => ({...kk, value: kk.name}))
                    cb(temp_arr)
                }).catch(err => {
                    Toast({msg: '请搜索有效地址', type: 'error', duration: 3})
                })
                this.handleInputAutoChange(type)
        },

        /**
         * 表单的验证事件
         */
        handleSubmit(){
            let msg = this.type == 0 ? '发货信息' : '收货信息'
            this.$refs.myOrderForm.validate(valid => {
                this.SetOrderFormStatus({index: this.type, value: valid})
                if(!valid){
                    this.Toast({msg: '请检查' + msg, type: 'error', duration: 3})
                    return
                }
            })
        }
    },
    created(){
        this.temp_form = {
            ...this.temp_form,
            ...this.formObj,
            detailed: this.type == 0 ? this.formObj.shipper_address.detailed : this.formObj.recipient_address.detailed,
        }
    },
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@include b(card-location) {
    width: 100%;
    height: 100%;

    @include b(card-form) {
        width: inherit;
        height: 100%; 

        @include e(auto-complete) {
            width: 50%;
        }

        @include e(input) {
            width: 30%;
        }
    }
}
</style>