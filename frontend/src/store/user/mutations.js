import MT from './mutation-types'

export default {
  [MT.SET_USER_LOGGED_IN] (state, user) {
    state.userLoggedIn = true
    state.userData.role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    state.userData.name = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    state.userData.expirationTime = user['exp']
    state.userData.obtainingTime = user['nbf']
    state.userData.token = user['token']
  },
  [MT.UNSET_USER_LOGGED_IN] (state) {
    state.userLoggedIn = false
    state.userData.role = null
    state.userData.name = null
    state.userData.expirationTime = null
    state.userData.obtainingTime = null
    state.userData.token = null
  }
}
