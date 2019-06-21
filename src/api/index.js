import request from '@/utils/request';
const TARGET_HTTP = 
    process.env.VUE_APP_CURRENTMODE == 'production' ? 
    process.env.VUE_APP_TARGET_HTTP : 
    'http://192.168.0.108:19020/index/callback'

export const getClassifyList = () =>
    request({
        method: 'get',
        url: '/cargo/type'
    })

export const getImgCode = () => 
    request({
        method: 'get',
        url: '/captcha/img'
    })

export const postMsgCode = ({
    captcha,
    random_str,
    phone
} = {}) => 
    request({
        method: 'post',
        url: '/message/code',
        data: {
            captcha,
            random_str,
            phone
        }
    })

export const postUserLogin = ({
    phone,
    code
} = {}) => 
    request({
        method: 'post',
        url: '/login',
        data: {
            phone,
            code
        }
    })

export const  getPriceInfo = (form) => 
    request({
        method: 'post',
        url: '/price',
        data: form
    })

export const getCouponInfo = ({token, form} = {}) => 
    request({
        method: 'post',
        url: '/coupon/usable',
        headers: {
            Authorization: token
        },
        data: form
    })

export const postOrder = ({
    token, form
}) =>
    request({
        method: 'post',
        url: '/order/reserve',
        data: form,
        headers: {
            Authorization: token
        }
    })

export const getAlipay = ({
    order_id,
    token
}) =>
    request({
        method: 'get',
        url: '/pay/alipay',
        params: {
            order_id,
            return_url: TARGET_HTTP
        },
        headers: {
            Authorization: token
        }
    })

export const getWechat = ({
    order_id,
    token
}) => 
    request({
        method: 'get',
        url: '/pay/wechat',
        params: {
            order_id,
        },
        headers: {
           Authorization: token
        }
    })

export const getOrderState = ({
    token,
    order_id
}) => 
    request({
        method: 'get',
        url: '/order/status',
        headers: {
            Authorization: token
        },
        params: {
            order_id
        }
    })