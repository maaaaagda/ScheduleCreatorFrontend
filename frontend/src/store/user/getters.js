export default {
  isUserLoggedIn: state => state.userLoggedIn,
  getToken: state => state.userData.token,
  getUserLogin: state => state.userData.name,
  getUserRole: state => state.userData.role
}
