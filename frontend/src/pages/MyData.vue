<template>
  <div class="container mt-4">
    <form class="mb-5">
      <div class="col-9 offset-3">
        <div class="col-9">
          <div  class="mb-5">
            <h4>Moje dane</h4>
          </div>
          <div>
            <div class="row ">
              <div class="col-6">
                <div class="form-group">
                  <label for="name">Imię:</label>
                  <input :disabled="!editData" type="text" class="form-control form-control-sm" id="name"
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
                  <label for="surname">Nazwisko:</label>
                  <input :disabled="!editData" type="text" class="form-control form-control-sm" id="surname"
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
                  <label for="email">Email:</label>
                  <input :disabled="!editData" type="email" class="form-control form-control-sm" id="email"
                         name="email"
                         v-validate="'required|email'"
                         :class="{'is-invalid': errors.has('email')}"
                         v-model="worker.email"
                         data-vv-as="e-mail">
                  <span v-show="errors.has('email')"
                        class="invalid-feedback">{{ errors.first('email') }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="phone">Numer telefonu:</label>
                  <input :disabled="!editData" type="number" class="form-control form-control-sm" id="phone"
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
                  <label for="address">Adres:</label>
                  <textarea :disabled="!editData" type="text" class="form-control form-control-sm" id="address"
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
            <div class="row justify-content-center">
              <button type="button" id="editOrSaveBtn" @click="editOrSaveData" class="btn btn-outline-dark">
                Edytuj dane
              </button>
            </div>
            <v-dialog/>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script scoped>
import axios from 'axios'

export default {
  name: 'mydata',
  data () {
    return {
      worker: {
        name: '',
        surname: '',
        email: '',
        phoneNo: '',
        address: '',
        login: ''
      },
      editData: false
    }
  },
  methods: {
    editOrSaveData: function () {
      if (this.editData === false) {
        this.editData = true
        $('#editOrSaveBtn').text('Zapisz')
        $('input').addClass('input-focus')
        $('textarea').addClass('input-focus')
      } else {
        this.validateForm()
        $('#editOrSaveBtn').text('Edytuj dane')
        $('input').removeClass('input-focus')
        $('textarea').removeClass('input-focus')
        this.editData = false
      }
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.ensureUpdatingData(this.worker)
          }
        })
    },
    updateWorker (worker) {
      axios.put(`/worker/putforworker`, worker)
        .then((response) => {
        })
        .catch(() => {})
    },
    getWorkerData () {
      axios.get(`/worker/getlogged`)
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
    ensureUpdatingData (data) {
      this.$modal.show('dialog', {
        title: 'Edycja danych',
        text: `Czy na pewno chcesz zaktualizować swoje dane?`,
        buttons: [
          {
            title: 'Zapisz',
            handler: () => {
              this.updateWorker(data)
              this.$modal.hide('dialog')
              this.afterUpdatePopUp()
              this.getWorkerData()
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
        text: 'Gratulacje! Twoje dane zostały zaktualizowane.',
        buttons: [
          {
            title: 'Zamknij',
            default: true
          }
        ]
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
    $('#email').donetyping(function () {
      self.ensureEmailDoesNotExist()
    }, 100)
  },
  created () {
    this.getWorkerData()
  }
}
</script>

<style scoped>
  input:disabled, textarea:disabled {
    background-color: white;
    border: none;
    border-radius: 4px;
    padding-left: 0;
    text-decoration: underline;
  }
  .input-focus {
    outline: none;
    border-color: #26bba6;
    box-shadow: 0 0 10px #26bba6;
  }
  .success-icon {
    color: #26bba6;
    font-size: 3em;
  }
  .modal {
    height: 200px;
    width: 100px;
  }
</style>
