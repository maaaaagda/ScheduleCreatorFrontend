<template>
  <div class="row justify-content-center">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 mt-2">
      <div class="container mt-2 p-3">
        <div class="card p-5">
          <div>
            <h4 class="mb-5 text-md-center">
              Ustaw nowe hasło
            </h4>
          </div>
          <form v-on:keyup.enter="validateForm">
              <div class="form-group">
                <label for="inputPassword">Hasło <span class="required">*</span></label>
                <input type="password" class="form-control" id="inputPassword"
                       name="inputPassword"
                       v-validate="'required'"
                       :class="{'is-invalid': errors.has('inputPassword')}"
                       v-model="changePasswordData.newPassword"
                       data-vv-delay="1000"
                       data-vv-as="hasło">
                <span v-show="errors.has('inputPassword')"
                          class="invalid-feedback">{{ errors.first('inputPassword') }}</span>
               </div>
              <div class="form-group">
                <label for="inputVerifyPassword">Powtórz hasło <span class="required">*</span></label>
                <input type="password" class="form-control" id="inputVerifyPassword"
                       name="inputVerifyPassword"
                       v-validate="'required|confirmed:inputPassword'"
                       data-vv-delay="1000"
                       :class="{'is-invalid': errors.has('inputVerifyPassword')}"
                       data-vv-as="hasło ponownie">
                     <span v-show="errors.has('inputVerifyPassword')"
                            class="invalid-feedback">{{ errors.first('inputVerifyPassword') }}</span>
                </div>
             </form>
          <button type="button" class="btn btn-secondary mt-5" v-on:click="validateForm">Zapisz</button>
          <v-dialog/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'
import axios from 'axios'
export default {
  data () {
    return {
      changePasswordData: {
        newPassword: '',
        recoveryString: ''
      }
    }
  },
  methods: {
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.checkRecoveryString()
          }
        })
    },
    checkRecoveryString (queryString) {
      axios.post(`/login/checkrecoverystring`, queryString)
        .then((response) => {
          if (response.data && response.data === true) {
            this.changePassword(this.changePasswordData)
          }
        })
        .catch(() => {
          this.showPopupError()
        })
    },
    changePassword (changePasswordData) {
      axios.post(`/login/changeuserpassword`, changePasswordData)
        .then((response) => {
          this.$modal.show('dialog', {
            title: 'Zmiana hasła',
            text: 'Gratulacje! Hasło do twojego konta zostało zmienione.',
            buttons: [
              {
                title: 'Zamknij',
                default: true,
                handler: () => {
                  this.$router.push('/')
                }
              }
            ]
          })
        })
        .catch(() => {
          this.showPopupError()
        })
    },
    showPopupError () {
      this.$modal.show('dialog', {
        title: 'Zmiana hasła',
        text: 'Coś poszło nie tak... Prosimy o ponowienie akcji przywracania hasła',
        buttons: [
          {
            title: 'Zamknij',
            default: true
          }
        ]
      })
    }
  },
  created () {
    this.changePasswordData.recoveryString = this.$route.query.recoveryString
  }
}
</script>
<style scoped>
  .card {
    height: 550px;
  }
  .required {
    color: red;
  }
</style>
