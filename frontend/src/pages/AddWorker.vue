<template>
  <div class="container mt-4">
    <form class="mb-5">
      <div class="col-9 offset-3">
        <div class="col-9">
          <div  class="mb-5">
            <h4>Zarejestruj nowego pracownika</h4>
            <p>Uzupełnij wszystkie pola. Nazwa użytkownika musi być unikalna</p>
          </div>
          <form v-on:keyup.enter="validateForm">
            <div class="row ">
              <div class="col-6">
                <div class="form-group">
                  <label for="name">Imię <span class="required">*</span></label>
                  <input type="text" class="form-control form-control-sm" id="name"
                         name="name"
                         v-validate="'required'"
                         :class="{'is-invalid': errors.has('name')}"
                         v-model="worker.name"
                         data-vv-as="imię"/>
                  <span v-show="errors.has('name')"
                        class="invalid-feedback">{{ errors.first('name') }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="surname">Nazwisko <span class="required">*</span></label>
                  <input type="text" class="form-control form-control-sm" id="surname"
                         name="surname"
                         v-validate="'required'"
                         :class="{'is-invalid': errors.has('surname')}"
                         v-model="worker.surname"
                         data-vv-as="nazwisko"/>
                  <span v-show="errors.has('surname')"
                        class="invalid-feedback">{{ errors.first('surname') }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="email">Email <span class="required">*</span></label>
                  <input type="email" class="form-control form-control-sm" id="email"
                         name="email"
                         autocomplete="off"
                         v-validate="`required|email|emailExists:${emailExists}`"
                         :class="{'is-invalid': errors.has('email')}"
                         v-model="worker.email"
                         data-vv-as="e-mail"
                         data-vv-delay="1000"
                         v-on:keyUp="this.emailExists = false" >
                  <span v-show="errors.has('email')"
                        class="invalid-feedback">{{ errors.first('email') }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="phone">Numer telefonu</label>
                  <input type="tel" class="form-control form-control-sm" id="phone"
                         name="phone"
                         v-validate="'required|digits:9'"
                         :class="{'is-invalid': errors.has('phone')}"
                         v-model="worker.phoneNo"
                         data-vv-as="numer telefonu">
                  <span v-show="errors.has('phone')"
                        class="invalid-feedback">{{ errors.first('phone') }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="address">Adres <span class="required">*</span></label>
                  <textarea type="text" class="form-control form-control-sm" id="address"
                            name="address"
                            v-validate="'required'"
                            :class="{'is-invalid': errors.has('address')}"
                            v-model="worker.address"
                            data-vv-as="adres" rows="3"></textarea>
                  <span v-show="errors.has('address')"
                        class="invalid-feedback">{{ errors.first('address') }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="login">Login <span class="required">*</span></label>
                  <input type="text" class="form-control form-control-sm" id="login"
                         name="login"
                         autocomplete="off"
                         v-validate="`required|loginTaken:${loginTaken}`"
                         :class="{'is-invalid': errors.has('login')}"
                         v-model="worker.login"
                         data-vv-as="login"
                         data-vv-delay="1000"
                         v-on:keyUp="this.loginOk = false" />
                  <span v-show="errors.has('login')"
                        class="invalid-feedback">{{ errors.first('login') }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="inputState">Rola</label>
                  <select id="inputState" v-model="worker.role" class="form-control form-control-sm">
                    <option disabled value="">Wybierz rolę...</option>
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
             </div>
            <div class="row justify-content-center">
              <button type="button" @click="this.validateForm" class="btn btn-lg btn-outline-dark">
                Zarejestruj nowego pracownika
              </button>
            </div>
          </form>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'
import '../../static/js/donetyping'

export default {
  name: 'addworker',
  data () {
    return {
      worker: {
        name: '',
        surname: '',
        email: '',
        phoneNo: '',
        login: '',
        role: '',
        idCard: 177,
        address: ''
      },
      loginTaken: false,
      emailExists: false
    }
  },
  methods: {
    validateForm () {
      let vm = this
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.registerNewWorker(vm.worker)
          }
        })
    },
    registerNewWorker (worker) {
      axios.post('/worker', worker)
        .then((response) => {
          console.log(worker)
          if (response.status === 200) {
            router.push({path: '/admin/showworkers'})
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    ensureLoginNotTaken () {
      this.$store.dispatch('ensureLoginNotTaken', this.worker.login)
        .then((response) => {
          this.loginTaken = response.data
        })
    },
    ensureEmailDoesNotExist () {
      this.$store.dispatch('ensureEmailDoesNotExist', this.worker.email)
        .then((response) => {
          this.emailExists = response.data
        })
    }
  },
  mounted () {
    let self = this
    $('#login').donetyping(function () {
      self.ensureLoginNotTaken()
    }, 100)
    $('#email').donetyping(function () {
      self.ensureEmailDoesNotExist()
    }, 100)
  }
}
</script>

<style scoped>
  .required {
    color: red;
  }
</style>
