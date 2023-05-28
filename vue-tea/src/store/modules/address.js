import { getAddressAPI } from '@/common/api/AddressAPI'
import { GET_ADDRESS_DATA, INIT_ADDRESS, GET_SELECT_ADDRESS } from '../modules/mutation-types.js'
// import { Dialog, Toast } from 'vant'

export default {
  state: {
    addressList: []
  },
  getters: {},
  mutations: {
    [INIT_ADDRESS](state, list) {
      state.addressList = JSON.parse(JSON.stringify(list))
    },
    [GET_SELECT_ADDRESS](state, addressId) {
      sessionStorage.setItem('tea-address', JSON.stringify(state.addressList.filter((v) => v.id == addressId)[0]))
    }
  },
  actions: {
    async [GET_ADDRESS_DATA]({ commit }) {
      let { data: res } = await getAddressAPI()
      if (res.data.success) {
        commit('INIT_ADDRESS', res.data.addressList)
      }
    }
  },
  modules: {}
}
