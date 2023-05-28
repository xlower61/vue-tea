import { INIT_CART, FOLLOW_ALL_CHECK_BTN, DELETE_GOODS, GET_CART_DATA, CHANGE_NUM } from '../modules/mutation-types.js'
import { getCartAPI, deleteCartAPI, updateNumAPI } from '@/common/api/CartAPI'
import { Dialog, Toast } from 'vant'

export default {
  state: {
    cartList: [] //购物车数据,
  },
  getters: {
    //1是否全选
    isSelectedAll(state) {
      //没列表就灭，使用every，当所有元素都checked返回true
      return state.cartList.length === 0 ? false : state.cartList.every((v) => v.checked === true)
    },
    selectedList(state) {
      return state.cartList.filter((v) => v.checked)
    },
    //2实时金额和数量
    total(state, getters) {
      let total = { num: 0, price: 0 }
      getters.selectedList.forEach((v) => {
        total.num += parseInt(v.goods_num)
        total.price += v.goods_price * v.goods_num
      })
      return total
    }
  },
  mutations: {
    [INIT_CART](state, list) {
      state.cartList = list
    },
    [FOLLOW_ALL_CHECK_BTN](state, All) {
      state.cartList.forEach((v) => (v.checked = !All))
    }
  },
  actions: {
    //1获取购物车数据
    async [GET_CART_DATA]({ getters, commit }) {
      let { data: res } = await getCartAPI()
      if (!res.data.success) {
        return
      }

      //每一项加上checked属性，赋值为false
      res.data.cartList.forEach((v) => {
        v['checked'] = false
        v['checked'] = getters.selectedList.some((item) => item.id == v.id)
      })
      commit('INIT_CART', res.data.cartList)
    },

    //2删除商品操作
    [DELETE_GOODS]({ state, getters, commit }, item) {
      //没有选中商品，且点击的右下角删除
      if (item.method == 1 && !getters.total.num) {
        return Toast('请选择商品')
      }
      Dialog.alert({
        message: item.method == 1 ? '确定要删除这些商品吗' : '确定要删除这件商品吗',
        showCancelButton: true
      })
        .then(async () => {
          let cartIdList = []
          let nowlist = []
          //右下角删除按钮删除
          if (isNaN(item.id)) {
            nowlist = state.cartList.filter((v) => v.checked === false)
            nowlist.forEach((v) => cartIdList.push(v.id))
            commit('INIT_CART', nowlist)
            //单独删除
          } else {
            cartIdList = [item.id]
            nowlist = state.cartList.filter((v) => v.id != item.id)
            console.log(nowlist)
            commit('INIT_CART', nowlist)
          }
          let { data: res } = await deleteCartAPI(cartIdList)
          Toast(res.data.msg)
        })
        .catch(() => {})
    },
    //3修改商品数量操作
    async [CHANGE_NUM](context, { num, item }) {
      let { data: res } = await updateNumAPI(num, item.id)
      if (!res.data.success) {
        Toast(res.data.msg)
      }
    }
  },
  modules: {}
}
