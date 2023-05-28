import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import address from './modules/address.js'
import order from './modules/order.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cart,
    address,
    order
  }
})
