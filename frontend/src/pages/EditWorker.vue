<template>
  <div class="container mt-4">
    <form class="mb-5">
      <div class="col-9 offset-3">
        <div class="col-9">
          <div  class="mb-5">
            <h4>Edytuj dane pracownika</h4>
          </div>
          <div>
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
                         v-validate="`required|email|emailExists:${emailExists}`"
                         :class="{'is-invalid': errors.has('email')}"
                         v-model="worker.email"
                         data-vv-as="e-mail">
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
                  <label for="address">Adres  <span class="required">*</span></label>
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
                         v-validate="`required|loginTaken:${loginTaken}`"
                         :class="{'is-invalid': errors.has('login')}"
                         v-model="worker.login"
                         data-vv-as="login"/>
                  <span v-show="errors.has('login')"
                        class="invalid-feedback">{{ errors.first('login') }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="inputState">Rola</label>
                  <select id="inputState" v-model="worker.role" class="form-control form-control-sm">
                    <option disabled value="">Wybierz rolę...</option>
                    <option name="User">User</option>
                    <option name="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <button type="button" @click="validateForm" class="btn btn-lg btn-outline-dark">
                Zapisz nowe dane pracownika
              </button>
            </div>
            <v-dialog/>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'

export default {
  name: 'editworker',
  data () {
    return {
      worker: {
        name: '',
        surname: '',
        email: '',
        phoneNo: '',
        address: '',
        login: '',
        password: '',
        role: '',
        idCard: 17
      },
      emailExists: false,
      loginTaken: false,
      workerId: ''
    }
  },
  methods: {
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.ensureUpdatingData(this.worker)
          }
        })
    },
    updateWorker (worker) {
      axios.put(`/worker/putforadmin/${this.workerId}`, worker)
        .then((response) => {
          this.afterUpdatePopUp()
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getWorkerData (id) {
      axios.get(`/worker/${id}`)
        .then((response) => {
          let workerData = response.data
          this.loadWorkerData(workerData)
        })
    },
    loadWorkerData (data) {
      this.worker.name = data.name
      this.worker.surname = data.surname
      this.worker.address = data.address
      this.worker.email = data.email
      this.worker.phoneNo = data.phoneNo
      this.worker.login = data.login
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
    },
    ensureUpdatingData (data) {
      this.$modal.show('dialog', {
        title: 'Edycja danych',
        text: `Czy na pewno chcesz zaktualizować dane pracownika?`,
        buttons: [
          {
            title: 'Zapisz',
            handler: () => {
              this.updateWorker(data)
              this.$modal.hide('dialog')
              this.afterUpdatePopUp()
            }
          },
          {
            title: 'Wróć',
            default: true,
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    afterUpdatePopUp () {
      this.$modal.show('dialog', {
        title: 'Aktualizacja danych',
        text: 'Gratulacje! Dane pracownika zostały zaktualizowane.',
        buttons: [
          {
            title: 'Zamknij',
            default: true,
            handler: () => {
              router.push({path: '/admin/showworkers'})
            }
          }
        ]
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
    this.getWorkerData(this.workerId)
  },
  created () {
    this.workerId = this.$route.params.id
  }
}
</script>

<style scoped>
  .required {
    color: red;
  }
</style>
