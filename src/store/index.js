import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleShop from './moduleShop'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleShop
  },
  state,
  mutations,
  actions,
  getters
})