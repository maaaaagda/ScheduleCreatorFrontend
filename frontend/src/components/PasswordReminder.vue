<template>
  <div>
    <h4 class="mb-5 text-md-center">
      Przypomnij hasło
    </h4>
    <form v-on:keyup.enter="validateForm">
      <div class="form-group">
        <p class="mb-4">Podaj adres e-mail</p>
        <input type="email" class="form-control form-control-sm" id="email"
               name="email"
               v-validate="'required|email'"
               :class="{'is-invalid': errors.has('email')}"
               v-model="email"
               data-vv-as="e-mail"
               v-on:keyup="emailOk = true">
        <span v-show="errors.has('email')"
              class="invalid-feedback">{{ errors.first('email') }}</span>
      </div>
      <div class="text-center mt-5">
        <button type="button" class="btn btn-secondary  justify-content-center" v-on:click="validateForm">Przypomnij hasło</button>
      </div>
    </form>
    <div v-if="!emailOk" class="d-flex justify-content-center">
      <div class="card border-danger mt-5 mb-3 justify-content-center" style="max-width: 18rem;">
        <div class="card-body text-danger">
          <p class="card-text">Użytkownik o podanym adresie e-mail nie istnieje</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      emailOk: true
    }
  },
  methods: {
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.checkIfEmailExists(this.email)
          }
        })
    },
    checkIfEmailExists (email) {
      axios.get('/worker/checkforemail?email=' + email)
        .then((response) => {
          if (response.data && response.data === true) {
            this.sendEmail(email)
          } else {
            this.emailOk = false
          }
        })
    },
    sendEmail (email) {
      axios.post(`login/resetpassword/${email}`)
        .then((response) => {
          this.$router.push('/login/remindpasswordinfo')
        })
    }
  }
}
</script>
