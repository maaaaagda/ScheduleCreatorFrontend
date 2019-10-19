import MT from './mutation-types'
import axios from 'axios'
export default {
  setUserLoggedIn ({commit}, user) {
    commit(MT.SET_USER_LOGGED_IN, user)
  },
  unsetUserLoggedIn ({commit}) {
    commit(MT.UNSET_USER_LOGGED_IN)
  },
  ensureLoginNotTaken ({commit}, login) {
    return axios.get(`/worker/checkforlogin?login=${login}`)
  },
  ensureEmailDoesNotExist ({commit}, email) {
    return axios.get(`/worker/checkforemail?email=${email}`)
  }
}
