export default {
  dictionary: {
    pl: {
      messages: {
        email: function (field1) {
          return `Podaj poprawny adres email`
        },
        required: function (field1) {
          return `Podaj ${field1}`
        },
        confirmed: function () {
          return `Hasła muszą być zgodne`
        },
        digits: function () {
          return `Numer telefonu musi składać się z dziewięciu cyfr`
        },
        loginTaken: () => 'Podany login jest zajęty. Wybierz inny.',
        emailExists: () => 'Dla podanego adresu e-mail istnieje już konto w serwisie.'
      }
    }
  }
}
