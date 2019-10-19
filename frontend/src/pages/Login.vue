<template>
  <div class="row justify-content-center no-gutters">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 mt-2">
      <div class="container mt-2 p-3">
        <div class="card p-5">
          <transition enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut"
                      mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'

export default {}
</script>
<style scoped>
  .card {
    height: 550px;
  }
</style>
