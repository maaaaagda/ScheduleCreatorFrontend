<template>
  <div>
    <div>
      <p class="mb-5">
        Na podany przez Państwo adres e-mail został wysłany link przypominający hasło.
        <span class="spam">Prosimy o sprawdzenie, czy link nie trafił do folderu SPAM. </span>
        Jeśli wiadomość od nas nie pojawi się w państwa skrzynce mailowej w ciągu 5 minut, prosimy kliknąc
        przycisk poniżej.
      </p>
    </div>
    <div class=" mt-4">
      <div class="m-1">
        <router-link to="/login" class="link">Wróć do strony logowania</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
  .spam {
    text-decoration: underline;
  }
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
