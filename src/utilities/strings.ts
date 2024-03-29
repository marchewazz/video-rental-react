import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
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
      hero: {
        rentNow: "Rent now"
      },
      mostPopularShowsSwiper: {
        title: "Most popular"
      }
    },
    registerPage: {
      title: "Register!",
      form: {
        repeatPassword: "Repeat password...",
        passEmail: "Pass email...",
        passNick: "Pass nick...",
        missingNick: "Pass nick",
        atSignInNick: "Nick cannot contain at-sign",
        missingEmail: "Pass email",
        wrongEmailFormat: "Wrong email format",
        missingPasswords: "Pass passwords",
        wrongPasswordFormat: "Password must be at least 5 characters long and contains at least 1 number and 1 special character",
        passwordNotTheSame: "Passwords are not the same",
        nickTaken: "Nick is already taken",
        emailTaken: "This email is already registered",
        tooLongNick: "Nick cannot be longer than 15 characters",
        errorMessage: "There is some error, try again later",
        registeredSuccess: "Registered, login ",
        registeredSuccessHere: "here",
        submitButtonText: "Register"
      }
    },
    loginPage: {
      title: "Login!",
      form: {
        passPassword: "Pass password...",
        passEmailOrNick: "Pass email or nick...",
        missingNickOrEmail: "Pass nick or email",
        missingPassword: "Pass password",
        emailNotExists: "There is no account with this email",
        nickNotExists: "There is no account with this nick",
        wrongPassword: "Wrong password",
        errorMessage: "There is some error, try again later",
        generateAccount: "Generate account",
        generateAccountPassword: "Passoword: ",
        submitButtonText: "Login"
      }
    },
    showPage: {
      notFound: "Cannot find show with this ID",
      rentButton: "You can rent {title} for 30 days for {price}$",
      notEnoughMoney: "You have not enough money. You need: {price}$",
      addToFavorites: "Add to favorites",
      removeFromFavorites: "Remove from favorites",
      cancelButtonText: "Cancel rental",
      releaseDate: "Release date: ",
      runTime: "Runtime: ",
      totalSeasons: "Seasons: ",
      ratingCategory: "Rating: ",
      ratingValue: "{rating}/{votes} votes",
      series: "SERIES",
      movie: "MOVIE",
      couldntGetPlotTranslated: "We couldn't get the plot translated",
      countdownTimer: {
        title: "Your rental ends in:",
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds"
      }
    },
    addMoneyPage: {
      title: "Add money",
      balanceInfo: "You have {balance}$",
      buttonText: "Confirm"
    },
    otherUserPage: {
      title: "{nick}'s profile",
      notFound: "Not found user with this ID",
      friendsText: "You are friends since ",
      deleteButton: "Delete friend",
      cancelButton: "Delete invitation",
      invitationText: "You got an invitation",
      acceptButton: "Accept",
      rejectButton: "Reject",
      sendInvitation: "Send invitation",
      comparasions: {
        friendRentedIt: "Friend rented it",
        friendLikeIt: "Friend likes it",
        bothLikeIt: "You both like it",
        bothRentedIt: "You both rented it",
        noFriends: "You need to be friends to see comparasions"
      }
    },
    searchPage: {
      title: "Results for: ",
      notFoundTitle: "We don't have movies or series for: ",
      notFoundUsers: "No users found",
      notFoundSubTitle: "Check others!",
      usersTitle: "Users"
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
      profileEdited: "Profile edited",
      nickTaken: "Nick is taken",
      serverInfo: "It may take a while to load as there are some free hosting limitations, but it's gonna be ok :)"
    },
    profilePage: {
      title: "Your profile",
      userCreateDate: "User since: ",
      emptyList: "List is empty",
      favorites: "Favorites",
      friendsText: "You are friends since {date}",
      emptyActiveRentalsLists: "No active rentals",
      emptyExpiredRentalsLists: "No expired rentals",
      emptyCancelledRentalsLists: "No cancelled rentals",
      noInvitations: "No invitations",
      noFriends: "No friends",
      rentalStarted: "Started: ",
      rentalEnding: "Ending: ",
      rentalExpired: "Expired: ",
      rentalCancelled: "Cancelled: ",
      nav: {
        lists: "Lists",
        friends: "Friends",
        invitations: "Invitations",
        rentals: "Rentals",
        rentalsActive: "Active",
        rentalsExpired: "Expired",
        rentalsCancelled: "Cancelled"
      },
    },
    seriesPage: {
      title: "Series page could be here but API doesn't allow search only for series :("
    },
    moviesPage: {
      title: "Series page could be here but API doesn't allow search only for movies :("
    },
    cookiesPage: {
      titleDefault: "Cookies infomation could be here but it's not as it's portoflio app...",
      titleFromPrivacy: "...same with cookies"
    },
    privacyPage: {
      titleDefault: "Privacy policy could be here but it's not as it's portoflio app...",
      titleFromCookies: "...same with privacy policy"
    },
    footer: {
      shortcuts: "Shortcuts",
      usefulLinks: "Useful links",
      series: "Series",
      movies: "Movies",
      privacyPolicy: "Privacy policy",
      cookies: "Cookies"
    },
    util: {
      translationInfo: "Translation generated by DeepL",
      loadingInfo: "Loading"
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
      hero: {
        rentNow: "Wypożcz teraz"
      },
      mostPopularShowsSwiper: {
        title: "Najpopularniejsze"
      }
    },
    registerPage: {
      title: "Zarejestruj się!",
      form: {
        passEmail: "Podaj email...",
        repeatPassword: "Powtórz hasło...",
        passNick: "Podaj nick...",
        missingNick: "Podaj nick",
        atSignInNick: "Nick nie może zawierać znaku @",
        missingEmail: "Podaj email",
        wrongEmailFormat: "Zły format maila",
        missingPasswords: "Podaj hasła",
        wrongPasswordFormat: "Hasło musi mieć przynajmniej 5 znaków oraz zawierać cyfrę i znak specjalny",
        passwordNotTheSame: "Hasła nie są takie same",
        nickTaken: "Nick jest już zajęty",
        emailTaken: "Ten mail jest już zarejestrowany",
        tooLongNick: "Nick nie może mieć więcej niż 15 znaków",
        errorMessage: "Wystąpił błąd, spróbuj ponownie później",
        registeredSuccess: "Zarejestrowano, zaloguj się ",
        registeredSuccessHere: "tutaj",
        submitButtonText: "Zarejestruj"
      }
    },
    loginPage: {
      title: "Zaloguj się!",
      form: {
        passPassword: "Podaj hasło...",
        passEmailOrNick: "Podaj email lub hasło...",
        missingNickOrEmail: "Podaj nick lub email",
        missingPassword: "Podaj hasło",
        emailNotExists: "Nie ma konta z takim adresem email",
        nickNotExists: "Nie ma konta z takim nickiem",
        wrongPassword: "Błędne hasło",
        errorMessage: "Wystąpił błąd, spróbuj ponownie później",
        generateAccount: "Generuj konto",
        generateAccountPassword: "Hasło: ",
        submitButtonText: "Zaloguj"
      }
    },
    showPage: {
      notFound: "Nie ma filmu lub serialu o tym ID",
      rentButton: "Możesz wypożyczyć {title} na 30 dni za {price}$",
      notEnoughMoney: "Nie masz wystaraczająco środków. Potrzebujesz: {price}$",
      addToFavorites: "Dodaj do ulubionych",
      removeFromFavorites: "Usuń z ulubionych",
      cancelButtonText: "Usuń wypożyczenie",
      releaseDate: "Data wydania: ",
      runTime: "Czas trwania: ",
      totalSeasons: "Sezony: ",
      ratingCategory: "Ocena: ",
      ratingValue: "{rating}/{votes} głosów",
      series: "SERIAL",
      movie: "FILM",
      couldntGetPlotTranslated: "Nie udało nam się przetłmaczyć opisu",
      countdownTimer: {
        title: "Twoje wypożyczenie kończy się za:",
        days: "dni",
        hours: "godzin",
        minutes: "minut",
        seconds: "sekund"
      }
    },
    addMoneyPage: {
      title: "Dodaj środki",
      balanceInfo: "Masz {balance}$",
      buttonText: "Zatwierdź"
    },
    otherUserPage: {
      title: "Profil użytkownika {nick}",
      notFound: "Nie znaleziono użytkownika o tym ID",
      friendsText: "Jesteście znajomymi od ",
      deleteButton: "Usuń znajomego",
      cancelButton: "Usuń zaproszenie",
      invitationText: "Masz zaproszenie",
      acceptButton: "Zaakceptuj",
      rejectButton: "Odrzuć",
      sendInvitation: "Wyślij zaproszenie",
      comparasions: {
        friendRentedIt: "Znajomy to wypożyczył",
        friendLikeIt: "Znajomy lubi to",
        bothLikeIt: "Oboje to lunicie",
        bothRentedIt: "Oboje to wypożyczyliście",
        noFriends: "Musicie być znajomymi by zobaczyć porównania"
      }
    },
    searchPage: {
      title: "Wyniki wyszukiwania dla: ",
      notFoundTitle: "Nie mamy filmów czy seriali dla frazy: ",
      notFoundUsers: "Nie ma użytkowników z tym nickiem",
      notFoundSubTitle: "Sprawdź inne!",
      usersTitle: "Użytkownicy"
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
      profileEdited: "Edytowano profil",
      nickTaken: "Nick jest zajęty",
      serverInfo: "Ładowanie może chwilę zająć z powodu limitów darmowego hostingu, ale załaduje się :)"
    },
    profilePage: {
      title: "Twój profil",
      userCreateDate: "Użytkownik od: ",
      emptyList: "Lista jest pusta!",
      favorites: "Ulubione",
      emptyActiveRentalsLists: "Brak aktywnych wypożyczeń",
      emptyExpiredRentalsLists: "Brak wygasłych wypożyczeń",
      emptyCancelledRentalsLists: "Brak anulowanych wypożyczeń",
      noInvitations: "Brak zaproszeń",
      noFriends: "Brak znajomych",
      friendsText: "Jesteście znajomymi od {date}",
      rentalStarted: "Od: ",
      rentalEnding: "Kończy się: ",
      rentalExpired: "Wygasa: ",
      rentalCancelled: "Anulowano: ",
      nav: {
        lists: "Listy",
        friends: "Znajomi",
        invitations: "Zaproszenia",
        rentals: "Wypożyczenia",
        rentalsActive: "Aktywne",
        rentalsExpired: "Wygasłe",
        rentalsCancelled: "Anulowane"
      }
    },
    seriesPage: {
      title: "Tu mogłaby być strona z serialami ale API nie pozwala szukać tylko seriali :("
    },
    moviesPage : {
      title: "Tu mogłaby być strona z serialami ale API nie pozwala szukać tylko filmów :("
    },
    cookiesPage: {
      titleDefault: "Infomacje o ciastkach byłyby tu ale to aplikacja do portfolio...",
      titleFromPrivacy: "...tak samo z ciastkami"
    },
    privacyPage: {
      titleDefault: "Infomacje o polityce prywatności byłyby tu ale to aplikacja do portfolio...",
      titleFromCookies: "...tak samo z polityką prywatności"
    },
    footer: {
      shortcuts: "Na skróty",
      usefulLinks: "Przydatne linki",
      series: "Seriale",
      movies: "Filmy",
      privacyPolicy: "Polityka prywatności",
      cookies: "Cookies"
    },
    util: {
      translationInfo: "Wygenerowano w DeepL",
      loadingInfo: "Ładowanie"
    }
  },
});

export default strings;