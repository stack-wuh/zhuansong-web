import {
    getClassifyList,
    getImgCode,
    postMsgCode,
    postUserLogin,
    getPriceInfo,
    getCouponInfo,
    postOrder,
    getAlipay,
    getWechat,
    getOrderState
} from '@/api/index'
import {Toast} from '@/utils/global'

const state = {
    classifyList: [],
    imgCode: {},
    canShowImgBox: false,
    orderInfo: {},
    couponInfo: {},
    userToken: {},
    couponList: [
        {
            info: '不使用优惠券',
            reduce_money: 0,
            id: 0
        }
    ],
    payInfo: {},
    result: [false, false, false],
    orderStaus: {},
    currentMoney: 0 , // 计算所需要的总金额
}

const mutations = {
    /**计算总金额 */
    SET_CURRENT_MONEY: (state) => {
        let {
            distance_fee,
            distance_start_fee,
            night_fee,
            bridge_fee
        } = state.orderInfo
        let total = bridge_fee + distance_fee + distance_start_fee + night_fee
        state.currentMoney = total 
    },
    /** 设置物品信息列表 */
    SET_CLASSIFY_LIST: (state, data) => {
        state.classifyList = data
    },
    /**
     * 设置图片验证码信息
     */
    SET_IMG_CODE: (state, data) => {
        state.imgCode = data
        state.canShowImgBox = true
    },
    /**设置订单详情 */
    SET_ORDER_INFO: (state,data) => {
        state.orderInfo = data
    },
    SET_COUPON_INFO: (state, data) => {
        state.couponInfo = data
    },
    SET_USER_TOKEN: (state, data) => {
        state.userToken = data
    },
    SET_COUPON_LIST: (state, data) => {
        state.couponList = data
    },
    SET_PAY_INFO: (state, data) => {
        state.payInfo = data
    },
    /**
     * 设置表单的状态值
     */
    SET_ORDER_FORM_STATUS: (state, data) => {
        state.result[data.index] = data.value
    },
    /**
     * 设置获取的订单状态
     */
    SET_ORDER_STATUS: (state, data) => {
        state.orderStaus = data
    }
}

const actions = {
    SetOrderFormStatus: ({commit}, state) => {
        commit('SET_ORDER_FORM_STATUS', state)
    },
    /**
     * 获取物品信息列表
     * @param {*} param0 
     */
    async GetClassifyList({commit}){
        const response = await getClassifyList()
        commit('SET_CLASSIFY_LIST', response.data)
        return response
    },

    /**
     * 获取图片验证码
     * @param {*} param0 
     */
    async GetImgCode({commit}){
        const response = await getImgCode()
        commit('SET_IMG_CODE', response.data)
        return response
    },

    /**
     * 发送短信验证码
     * @param {*} context 
     * @param {*} form 
     */
    async PostMsgCode({state}, form) {
        const response = await postMsgCode({
            ...form,
            random_str: state.imgCode.random_str
        })
        
        return response
    },

    /**
     * 登录
     * @param {*} context 
     * @param {*} form 
     */
    async PostUserLogin(context, form) {
        let {phone, code} = form
        let local = localStorage
        if(!phone) {
            Toast({msg: '请编辑手机号', type: 'error'})
            return 
        }else if(!code) {
            Toast({msg: '请编辑验证码', type: 'error'})
            return 
        }
        const response = await postUserLogin(form)
        local.setItem('token', JSON.stringify(response.data))
        context.commit('SET_USER_TOKEN', response.data)
        return response
    },

    /**
     * 根据表单获取价格信息
     * @param {*} context 
     * @param {*} form 
     */
    async GetPriceInfo(context, form) {
        const response = await getPriceInfo(form)
        context.commit('SET_ORDER_INFO', response.data)
        context.commit('SET_CURRENT_MONEY')
        return response
    },

    /**获取优惠券详情 */
    async GetCouponInfo(context, form){
        const response = await getCouponInfo(form)
        context.commit('SET_COUPON_LIST', response.data)
        return response
    },

    /**
     * 下单
     */
    async PostOrder(context, form) {
        const response = await postOrder(form)
        context.commit('SET_PAY_INFO', response.data)
        return response
    },

    /**
     * 微信支付
     * @param {*} context 
     * @param {*} form 
     */
    async GetWechat({state}, token) {
        const response = await getWechat({
            order_id: state.payInfo.order_id,
            token
        })
        return response
    },

    /**
     * Alipay 支付
     * @param {*} param0 
     * @param {*} token 
     */
    async GetAlipay({state}, token) {
        const response = await getAlipay({
            order_id: state.payInfo.order_id,
            token
        })
        return response
    },

    /**
     * 获取订单状态
     * @param {*} context 
     * @param {*} param1 
     */
    async GetOrderState(context, {token, order_id} = {}) {
        const response = await getOrderState({token, order_id})
        context.commit('SET_ORDER_STATUS', response)
        return response
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
