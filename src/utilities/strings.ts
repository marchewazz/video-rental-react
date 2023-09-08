import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  en: {
    nav: {
      login: "LOGIN",
      register: "REGISTER",
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
        submitButtonText: "Login"
      }
    }
  },
  pl: {
    nav: {
      login: "LOGOWANIE",
      register: "REJESTRACJA",
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
        errorMessage: "TWystąpił błąd, spróbuj ponownie później",
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
        submitButtonText: "Zaloguj"
      }
    }
  },
});

export default strings;