<template>
  <div>
    <div>
      <h4 class="mb-5 text-md-center">
        Zaloguj się
      </h4>
    </div>
    <form v-on:keyup="loginOk = true" v-on:keyup.enter="validateForm">
      <div class="form-group">
        <label for="login">Login</label>
        <input type="text" class="form-control" id="login"
               name="login"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('login')}"
               v-model="credential.login"
               data-vv-as="login"/>
        <span v-show="errors.has('login')"
              class="invalid-feedback">{{ errors.first('login') }}</span>
      </div>
      <div class="form-group">
        <label for="password">Hasło</label>
        <input type="password" class="form-control" id="password"
               name="password"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('password')}"
               v-model="credential.password"
               data-vv-as="hasło"/>
        <span v-show="errors.has('password')"
              class="invalid-feedback float-left">{{ errors.first('password') }}</span>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-secondary" v-on:click="validateForm">Zaloguj się</button>
        <div v-if="!loginOk" class="d-flex justify-content-center">
          <div class="card border-danger mt-4 mb-3 justify-content-center" style="max-width: 18rem;">
            <div class="card-body text-danger">
              <p class="card-text">Błędny login lub hasło</p>
            </div>
          </div>
        </div>
        <div class="m-3">
          <router-link to="/login/remindpassword" class="link">Przypomnij mi login lub hasło</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import jwt from 'jwt-decode'

export default {
  data () {
    return {
      credential: {
        login: '',
        password: ''
      },
      loginOk: true
    }
  },
  methods: {
    logMeIn () {
      axios.post('/login/loginuser', this.credential)
        .then((response) => {
          let decodedToken = jwt(response.data)
          decodedToken['token'] = response.data
          this.$store.dispatch('setUserLoggedIn', decodedToken)
          this.$router.push('/')
        })
        .catch(() => {
          this.loginOk = false
        })
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.logMeIn()
          }
        })
    }
  }
}
</script>

<style>
  .link {
    text-decoration: underline;
    color: #26bba6;
  }
  .link:hover {
    cursor: pointer;
  }
  .link:active {
    color: #1e9584;
  }
</style>
