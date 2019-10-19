<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="mainNavbar">
    <router-link to="/" class="navbar-brand ml-lg-5" >
      <img src="../../static/images/app_icon.png" alt="App icon" width="50" height="40">
      Kreator Grafiku
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" v-if="isUserLoggedIn && getUserRole == 'User'">
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Mój grafik</a>
          </li>
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Moje deklaracje</a>
          </li>
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Informacje</a>
          </li>
      </ul>
      <ul class="navbar-nav" v-if="isUserLoggedIn && getUserRole == 'Admin'">
          <li class="nav-item ml-2">
            <router-link to="/admin/showworkers" class="nav-link ">Pracownicy</router-link>
          </li>
          <li class="nav-item ml-2">
            <router-link to="/admin/addworker" class="nav-link ">Dodaj pracownika</router-link>
          </li>
       </ul>
      <ul class="navbar-nav ml-auto" v-if="!isUserLoggedIn">
        <li class="nav-item ml-2">
          <router-link to="/login" class="nav-link ">Login</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto dropdown" v-if="isUserLoggedIn">
        <div class="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="nav-item ml-2 pointer">
            <span class="mr-3">Witaj użytkowniku {{getUserLogin}}!</span><i class="fas fa-user-circle userIcon"></i>
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <router-link to="/user/mydata" class="dropdown-item pointer">Moje dane</router-link>
          <p class="dropdown-item pointer" @click="logOut">Wyloguj</p>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isUserLoggedIn', 'getUserLogin', 'getUserRole'])
  },
  methods: {
    logOut () {
      this.$store.dispatch('unsetUserLoggedIn')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #mainNavbar {
    background-color: #26bba6;
  }
  #mainNavbar a, .navbar {
    color: white;
  }
  .dropdown-menu a {
    color: #26bba6 ;
  }
  .pointer {
    cursor: pointer;
  }
  .userIcon {
    font-size: 200%;
    cursor: pointer;
  }
  .dropdown-item.active, .dropdown-item:active {
    background-color: #26bba6;
  }
  .dropdown-item {
    color: #26bba6 !important;
  }
</style>
