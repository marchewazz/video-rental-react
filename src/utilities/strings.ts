import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  en: {
    nav: {
      login: "LOGIN",
      register: "REGISTER",
      addMoney: "ADD MONEY",
      balanceInfo: "Balance: {balance}$",
      greeting: "Hello, {nickName}!",
      searchBar: "Search...",
      searchInfo: "Only English or original names"
    },
    mainPage: {
      title: "MAIN PAGE",
    },
    registerPage: {
      title: "Register!",
      form: {
        missingNick: "Pass nick",
        atSignInNick: "Nick cannot contain at-sign",
        missingEmail: "Pass email",
        wrongEmailFormat: "Wrong email format",
        missingPasswords: "Pass passwords",
        wrongPasswordFormat: "Password must be at least 5 characters long and contains at least 1 number and 1 special character",
        passwordNotTheSame: "Passwords are not the same",
        nickTaken: "Nick is already taken",
        emailTaken: "This email is already registered",
        errorMessage: "There is some error, try again later",
        registeredSuccess: "Registered, login ",
        registeredSuccessHere: "here",
        submitButtonText: "Register"
      }
    },
    loginPage: {
      title: "Login!",
      form: {
        missingNickOrEmail: "Pass nick or email",
        missingPassword: "Pass password",
        emailNotExists: "There is no account with this email",
        nickNotExists: "There is no account with this nick",
        wrongPassword: "Wrong password",
        errorMessage: "There is some error, try again later",
        submitButtonText: "Login"
      }
    },
    showPage: {
      notFound: "Cannot find show with this ID",
      rentButton: "You can lend {title} for 30 days for {price}$",
      notEnoughMoney: "You have not enough money. You need: {price}$",
      addToFavorites: "Add to favorites",
      removeFromFavorites: "Remove from favorites",
      cancelButtonText: "Cancel rental"
    },
    addMoneyPage: {
      title: "Add money",
      balanceInfo: "You have {balance}$",
      buttonText: "Confirm"
    },
    otherUserPage: {
      notFound: "Not found user with this ID",
      friendsText: "You are friends since {date}",
      deleteButton: "Delete friend",
      cancelButton: "Delete invitation",
      invitationText: "You got an invitation",
      acceptButton: "Accept",
      rejectButton: "Reject",
      sendInvitation: "Send invitation"
    },
    searchPage: {
      title: "Results for: {phrase}",
      notFoundTitle: "We don't have movies or series for: {phrase}",
      notFoundSubTitle: "Check others!"
    },
    popUpNotifications: {
      rented: "Rented",
      rentalCancelled: "Rental cancelled",
      noMoney: "You don't have enough money",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      moneyAdded: "Money added",
      invitationSent: "Invitation sent",
      invitationReceived: "{senderNick} sent you an invitation",
      viewProfile: "View profile",
      errorMessage: "Error, try again later",
    }
  },
  pl: {
    nav: {
      login: "LOGOWANIE",
      register: "REJESTRACJA",
      addMoney: "DODAJ ŚRODKI",
      balanceInfo: "Saldo: {balance}$",
      greeting: "Cześć, {nickName}!",
      searchBar: "Szukaj...",
      searchInfo: "Tylko angielskie lub oryginalne nazwy"
    },
    mainPage: {
      title: "STRONA GŁÓWNA",
    },
    registerPage: {
      title: "Zarejestruj się!",
      form: {
        missingNick: "Podaj nick",
        atSignInNick: "Nick nie może zawierać znaku @",
        missingEmail: "Podaj email",
        wrongEmailFormat: "Zły format maila",
        missingPasswords: "Podaj hasła",
        wrongPasswordFormat: "Hasło musi mieć przynajmniej 5 znaków oraz zawierać cyfrę i znak specjalny",
        passwordNotTheSame: "Hasła nie są takie same",
        nickTaken: "Nick jest już zajęty",
        emailTaken: "Ten mail jest już zarejestrowany",
        errorMessage: "Wystąpił błąd, spróbuj ponownie później",
        registeredSuccess: "Zarejestrowano, zaloguj się ",
        registeredSuccessHere: "tutaj",
        submitButtonText: "Zarejestruj"
      }
    },
    loginPage: {
      title: "Zaloguj się!",
      form: {
        missingNickOrEmail: "Podaj nick lub email",
        missingPassword: "Podaj hasło",
        emailNotExists: "Nie ma konta z takim adresem email",
        nickNotExists: "Nie ma konta z takim nickiem",
        wrongPassword: "Błędne hasło",
        errorMessage: "Wystąpił błąd, spróbuj ponownie później",
        submitButtonText: "Zaloguj"
      }
    },
    showPage: {
      notFound: "Nie ma filmu lub serialu o tym ID",
      rentButton: "Możesz wypożyczyć {title} na 30 dni za {price}$",
      notEnoughMoney: "Nie masz wystaraczająco środków. Potrzebujesz: {price}$",
      addToFavorites: "Dodaj do ulubionych",
      removeFromFavorites: "Usuń z ulubionych",
      cancelButtonText: "Usuń wypożyczenie"
    },
    addMoneyPage: {
      title: "Dodaj środki",
      balanceInfo: "Masz {balance}$",
      buttonText: "Zatwierdź"
    },
    otherUserPage: {
      notFound: "Nie znaleziono użytkownika o tym ID",
      friendsText: "Jesteście znajomymi od {date}",
      deleteButton: "Usuń znajomego",
      cancelButton: "Usuń zaproszenie",
      invitationText: "Masz zaproszenie",
      acceptButton: "Zaakceptuj",
      rejectButton: "Odrzuć",
      sendInvitation: "Wyślij zaproszenie"
    },
    searchPage: {
      title: "Wyniki wyszukiwania dla: {phrase}",
      notFoundTitle: "Nie mamy filmów czy seriali dla frazy: {phrase}",
      notFoundSubTitle: "Sprawdź inne!"
    },
    popUpNotifications: {
      rented: "Wypożyczono",
      rentalCancelled: "Anulowane wypożyczenie",
      noMoney: "Nie masz wystarczająco środków",
      moneyAdded: "Środki dodane",
      addedToFavorites: "Dodano do ulubionych",
      removedFromFavorites: "Usunięto z ulubionych",
      invitationSent: "Wysłano zaproszenie",
      invitationReceived: "{senderNick} wysłał(a) Ci zaproszenie",
      viewProfile: "Zobacz profil",
      errorMessage: "Wystąpił błąd, spróbuj ponownie później",
    }
  },
});

export default strings;