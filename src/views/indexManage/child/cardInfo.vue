<template>
    <section class='my-card-goods'>
        <el-form 
            class="my-form"
            ref="myOrderForm"
            :model="temp_form"
            label-width="120px">
            <el-form-item 
                v-for="(item, index) in list"
                :key="index"
                :label="item.label"
                :prop="item.field"
                :rules="item.rule">
                <template v-if="item.type == 'checkbox'" >
                    <ul class="my-checkbox-group">
                        <li 
                            v-for="(cc, cl) in classify"
                            :key="cl"
                            class="my-checkbox-group__item">
                            <span
                                @click="handleClickChoose(cc)"
                                :class="[
                                    {
                                        'is-item-active': temp_form.goods_type == cc.value
                                    }
                                ]" 
                                class="my-checkbox-group__item--btn"
                                >{{cc.label}}</span>
                        </li>
                    </ul>
                </template>
                <template v-else-if="item.type == 'inputrange'">
                    <el-input
                        v-if="temp_weight > 4" 
                        class="my-input-number"
                        v-model="temp_weight"
                        >
                        <i @click="handleReduce" slot="prepend" class="el-icon-minus"></i>
                        <i @click="handleAdd" slot="append" class="el-icon-plus"></i>
                    </el-input>
                    <el-input
                        v-else 
                        class="my-input-number"
                        value="<5">
                        <div class="my-input-number__pre-box" @click="handleReduce" slot="prepend">
                            <i class="el-icon-minus"></i>
                        </div>
                        <div class="my-input-number__pre-box" @click="handleAdd" slot="append">
                            <i class="el-icon-plus"></i>
                        </div>
                    </el-input>
                    <span class="my-input__tips">KG</span>
                </template>
                <template v-else-if="item.type == 'textarea'">
                    <el-input
                        class="my-form__textarea" 
                        type="textarea"
                        v-model="temp_form[item.field]"
                        :placeholder="`请编辑${item.label}`"
                        rows="3">
                    </el-input>
                </template>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
const MAX_WEIGHT = 20
const MIN_WEIGHT = 4

import {mapMutations} from 'vuex'
 export default{
    name: 'MyCardGoodsInfo',
    components: {},
    props: {
        list: {
            type: Array,
            required: true
        },
        classify: {
            type: Array,
            required: true
        },
        formObj: {
            type: Object,
            required: false
        }
    },
    inject: ['Toast'],
    watch: {
        tempWeight(){
            this.temp_weight = this.temp_form.weight > 4 ? this.temp_form.weight : '<5'
        }
    },
    computed: {
        tempWeight(){
            return this.temp_form.weight
        }
    },
    data(){
        return {
            MAX_WEIGHT,
            MIN_WEIGHT,
            temp_form: {
                goods_type: '',
                weight: 4,
                note: ''
            },
            temp_weight: 4
        }
    },
    methods: {
        ...mapMutations(['SET_ORDER_FORM_STATUS']),
        /**
         * 点击物品信息添加form表单
         */
        handleClickChoose(item){
            this.temp_form.goods_type = item.value
        },
        handleSubmit(){
            this.$refs.myOrderForm.validate(valid => {
                this.SET_ORDER_FORM_STATUS({index: 2, value: valid})
                if(!valid) {
                    this.Toast({msg: '请检查物品信息', type: 'error', duration: 3})
                    this.SET_ORDER_FORM_STATUS({index: 2, value: false})
                    return
                }
            })
        },
        handleReduce(){
            if(this.temp_form.weight > 4){
                this.temp_form.weight--
            }else if(this.temp_form.weight <=4) {
                this.temp_form.weight = 4
            }
            this.$emit('changeInput', this.temp_form.weight)
        },
        handleAdd(){
            if(this.temp_form.weight < 20){
                this.temp_form.weight++
            }
            this.$emit('changeInput', this.temp_form.weight)
        },
    },
    created(){
        this.temp_form = {
            ...this.temp_form,
            ...this.formObj
        }
    },
    mixins: []
 }
</script>

<style scoped lang='scss'>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/color.scss';
@include b(card-goods) {
    width: 100%;
}
@include b(form) {
    @include e(textarea) {
        width: 100%;
    }
}
@include b(checkbox-group) {
    @include flex($dir: row, $align: center, $wrap: wrap);
    min-height: 100px;
    @include e(item) {
        margin-right: 20px;
        @include m(btn) {
            padding: 10px 30px;
            border-radius: 4px;
            font-size: 14px;
            background-color: #ebebeb;
            &:hover {
                cursor: pointer;
                background-color: $base;
                color: #fff;
                transition: backgroud-color .5s ease;
            }
        }
    }
}
@include b(input) {
    @include e(tips) {
        margin-left: 10px;
        user-select: none;
    }
}
@include b(input-number) {
    width: 180px;

    // @include e(pre-box) {
    //     width: 30px;
    //     height: 30px;  
    //     text-align: center;
    //     line-height: 30px; 
    // }
}
@include when(item-active) {
    position: relative; 
    background-color: $base !important;
    color: #fff;
    
    &::after {
        position: absolute;
        bottom: 0;
        right: -5px;
        content: '';
        padding: 10px 15px;
        background-image: url('../../../assets/imgs/ok.png');
        background-size: 40% 40%; 
        background-position: center;
        background-repeat: no-repeat;
    }
}
</style>