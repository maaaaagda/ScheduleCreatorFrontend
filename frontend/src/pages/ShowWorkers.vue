<template>
  <div v-if="workersLoaded" class="jumbotron-fluid justify-content-center mt-3 mx-5 mb-5">
    <div class=" row p-5">
      <div class="col-8">
        <h3>Lista wszystkich pracowników</h3>
      </div>
      <div class="col-4">
        <router-link to="/admin/addworker"><button class="btn btn-outline-dark float-right">Dodaj nowego pracownika</button></router-link>
      </div>
    </div>
    <input type="text" id="inputSearch" v-on:keyup="searchWorker" placeholder="  Szukaj po imieniu i nazwisku... "
           title="Search">
    <span class="glyphicon glyphicon-user form-control-feedback"></span>
    <v-dialog/>
    <table class="table table-hover" id="allWorkers">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Imię i nazwisko</th>
        <th scope="col">Email</th>
        <th scope="col">Telefon</th>
        <th scope="col">Adres</th>
        <th scope="col">Rola</th>
        <th scope="col">Edytuj</th>
        <th scope="col">Usuń</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="worker in workers" v-bind:key="worker.idW">
        <th scope="row">{{worker.idW}}</th>
        <td>{{worker.name}} {{worker.surname}}</td>
        <td>{{worker.email}}</td>
        <td>{{worker.phoneNo}}</td>
        <td>{{worker.address}}</td>
        <td>{{worker.role}}</td>
        <td>
          <router-link :to="{path: '/admin/editworker/'+worker.idW, params: {id: worker.idW}}"><button class="btn btn-outline-secondary">Edytuj</button></router-link>
        </td>
        <td>
          <button class="btn btn-outline-warning" @click="ensureDeletingWorker(worker.name+' '+worker.surname, worker.idW)">Usuń</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="container text-center m-5">
      <h3 class="disabled noResults" id="noWorkersFound">Brak wyników</h3>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'show-workers',
  data () {
    return {
      workers: [],
      workersLoaded: false
    }
  },
  methods: {
    getWorkers () {
      let vm = this
      axios.get('/worker')
        .then(function (response) {
          if (response.status === 200) {
            vm.workersLoaded = true
            vm.workers = response.data
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    searchWorker () {
      var input, filter, table, tr, td, i, hidden, noWorkersFound
      hidden = 0
      // eslint-disable-next-line
      noWorkersFound = $('#noWorkersFound')
      noWorkersFound.css('visibility', 'hidden')
      input = document.getElementById('inputSearch')
      filter = input.value.toUpperCase()
      table = document.getElementById('allWorkers')
      tr = table.getElementsByTagName('tr')
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0]
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
          } else {
            tr[i].style.display = 'none'
            hidden += 1
          }
        }
      }
      if (tr.length === hidden + 1) {
        noWorkersFound.text('Brak pasujących wyników').css('visibility', 'visible')
      }
    },
    ensureDeletingWorker (worker, id) {
      let vm = this
      this.$modal.show('dialog', {
        title: 'Usuń pracownika',
        text: `Czy na pewno chcesz usunąć pracownika ${worker}?`,
        buttons: [
          {
            title: 'Usuń',
            handler: () => {
              vm.deleteWorker(id)
              this.$modal.hide('dialog')
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
    deleteWorker (id) {
      let vm = this
      axios.delete(`/worker/${id}`)
        .then(function (response) {
          console.log('deleted', response.status)
          vm.getWorkers()
        })
        .catch(function (error) {
          console.log('error', error)
        })
    }
  },
  mounted () {
    this.getWorkers()
    this.$nextTick(() => {
      this.getWorkers()
    })
  }
}
</script>

<style>
  #inputSearch {
    background-image: url('../assets/searchIcon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
  }

  .noResults {
    color: #d6d6d6;
    visibility: hidden;
  }
</style>
