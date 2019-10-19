import Vuex from 'vuex'
import Vue from 'vue'
import user from './user/userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user
  }
})
