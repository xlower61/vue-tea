import { INIT_ORDER_ID, INIT_ORDER, GET_ORDER, SUBMIT_ORDER, PAY_ORDER } from '../modules/mutation-types.js'
import { getOrderAPI, submitOrderAPI, payOrderAPI } from '@/common/api/OrderAPI'
import { Toast } from 'vant'
import router from '@/router'

export default {
  state: {
    orderId: localStorage.getItem('tea_orderId') || '',
    order: {
      goods: [],
      price: 0,
      num: 0
    },
    orderList: []
  },
  getters: {},
  mutations: {
    [INIT_ORDER_ID](state, order_id) {
      localStorage.setItem('tea_orderId', order_id)
      state.orderId = localStorage.getItem('tea_orderId')
    },
    [INIT_ORDER](state, orderList) {
      state.order.goods = JSON.parse(orderList.goods_list)
      state.order.price = orderList.goods_price
      state.order.num = orderList.goods_num
    }
  },
  actions: {
    async [GET_ORDER]({ state, commit }, { orderStatus }) {
      let { data: res } = await getOrderAPI(state.orderId, orderStatus)
      if (res.data.success) {
        commit('INIT_ORDER', res.data.orderList[0])
      } else {
        Toast('订单未支付')
        router.back()
      }
    },
    async [SUBMIT_ORDER]({ state, dispatch }, { address }) {
      if (!address) {
        Toast('请选择收货地址！')
        return
      }
      let { data: res } = await submitOrderAPI(state.orderId, state.order)
      if (res.data.success) {
        dispatch('PAY_ORDER')
      } else {
        console.log(res, 999999)
      }
    },
    async [PAY_ORDER]({ state }) {
      let { data: res } = await payOrderAPI(state.orderId, state.order)
      if (res.data.success) {
        //打开支付页面
        window.location.href = res.data.paymentUrl
      }
    }
  },
  modules: {}
}
