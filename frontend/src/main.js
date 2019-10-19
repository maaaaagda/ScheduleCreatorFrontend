import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import VeeValidate from 'vee-validate'
import language from './custom/customErrorMessages'
import axios from 'axios'
import store from './store'
import vmodal from 'vue-js-modal'

Vue.use(vmodal, {dialog: true})
axios.defaults.baseURL = 'http://localhost:5000/api'

const checkIfLoginTaken = {
  getMessage: (value) => 'This username is taken. Try another one',
  validate: (value, [exists]) => {
    if (value === undefined || value === null) {
      return false
    }
    return exists !== 'true'
  }
}
const checkIfEmailExists = {
  getMessage: value => {
    return 'Already exists an account for given email address'
  },
  validate: (value, [exists]) => {
    if (value === undefined || value === null) {
      return false
    }
    return exists !== 'true'
  }
}

Vue.use(VeeValidate)
VeeValidate.Validator.extend('emailExists', checkIfEmailExists)
VeeValidate.Validator.extend('loginTaken', checkIfLoginTaken)

Vue.config.productionTip = false

VeeValidate.Validator.localize(language.dictionary)
VeeValidate.Validator.localize('pl')
Vue.config.productionTip = false

axios.interceptors.request.use((config) => {
  let authToken = store.getters.getToken
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
