import { useState } from "react";
import strings from "../utilities/strings";
import RegisterFormData from "../models/RegisterFormData.model";

import AuthService from "../services/AuthService.service";
import { Link, useOutletContext } from "react-router-dom";
import Page from "./Page";
import LoadingComponent from "../components/LoadingComponent";
import Context from "../models/Context.model";
import GenerateAccount from "../components/LoginRegisterPages/GenerateAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const [nick, setNick] = useState<string>("");
  const [nickMessage, setNickMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [registerMessage, setRegisterMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState<boolean>(false)

  const [disabledButton, setDisabledButton] = useState(false);

  const { languageReady } = useOutletContext<Context>();

  function submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    let correct = true;
    if (!nick) {
      setNickMessage(strings.registerPage.form.missingNick);
      correct = false;
    } else {
      if (nick.includes("@")) {
        setNickMessage(strings.registerPage.form.atSignInNick);
        correct = false;
      }
      if (nick.length > 15) {
        setNickMessage(strings.registerPage.form.tooLongNick);
        correct = false;
      }
    }
    if (!email) {
      setEmailMessage(strings.registerPage.form.missingEmail);
      correct = false;
    } else {
      if (
        !new RegExp(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        ).test(email)
      ) {
        setEmailMessage(strings.registerPage.form.wrongEmailFormat);
        correct = false;
      }
    }
    if (!password || !repeatedPassword) {
      setPasswordMessage(strings.registerPage.form.missingPasswords);
      correct = false;
    } else {
      if (password != repeatedPassword) {
        setPasswordMessage(strings.registerPage.form.passwordNotTheSame);
        correct = false;
      }
      if (
        !new RegExp(
          "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$"
        ).test(password) ||
        !new RegExp(
          "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$"
        ).test(repeatedPassword)
      ) {
        setPasswordMessage(strings.registerPage.form.wrongPasswordFormat);
        correct = false;
      }
    }
    if (correct) {
      const userData: RegisterFormData = {
        userNick: nick,
        userEmail: email,
        userPassword: password,
      };

      const as: AuthService = new AuthService();
      setDisabledButton(true);
      as.registerUser(userData)
        .then(async (res: any) => {
          const message: unknown = res.data.message;
          console.log(message as keyof typeof strings.registerPage.form);
          setRegisterMessage(
            strings.registerPage.form[
              message as keyof typeof strings.registerPage.form
            ] || ""
          );
          setDisabledButton(false);
        })
        .catch((e) => {
          setRegisterMessage(strings.registerPage.form.errorMessage || "");
          setDisabledButton(false);
        });
    }
  }

  return (
    <Page>
      <div className="container py-10 flex flex-col">
        {languageReady ? (
          <>
            <p className="font-semibold text-6xl italic text-dark-green dark:text-light-green mb-10">
              {strings.registerPage.title}
            </p>
            <form onSubmit={submitForm} className="flex flex-col self-center">
              <div className="my-5">
                <input
                  className="text-input w-full"
                  placeholder={strings.registerPage.form.passNick}
                  type="text"
                  name="nick"
                  onChange={(e) => {
                    setRegisterMessage("");
                    setNickMessage("");
                    setNick(e.target.value.trim());
                  }}
                />
                <p className="px-4 text-red-700 font-bold">{nickMessage}</p>
              </div>
              <div className="my-5">
                <input
                  className="text-input w-full"
                  placeholder={strings.registerPage.form.passEmail}
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setRegisterMessage("");
                    setEmailMessage("");
                    setEmail(e.target.value);
                  }}
                />
                <p className="px-4 text-red-700 font-bold">{emailMessage}</p>
              </div>
              <div className="my-5 flex flex-col gap-5">
                <div className="relative">
                  <input
                    className="text-input w-full pr-10"
                    placeholder={strings.loginPage.form.passPassword}
                    type="password"
                    name="passoword"
                    onChange={(e) => {
                      setRegisterMessage("");
                      setPasswordMessage("");
                      setPassword(e.target.value);
                    }}
                  />
                  <button className="absolute hover:scale-110 transition-all duration-100 ease-in-out text-white h-full w-10 right-0" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }}>
                    { showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
                  </button>
                </div>
                <div className="relative">
                  <input
                    className="text-input w-full pr-10"
                    placeholder={strings.registerPage.form.repeatPassword}
                    type="password"
                    name="repeatedPassoword"
                    onChange={(e) => {
                      setRegisterMessage("");
                      setPasswordMessage("");
                      setRepeatedPassword(e.target.value);
                    }}
                  />
                  <button className="absolute hover:scale-110 transition-all duration-100 ease-in-out text-white h-full w-10 right-0" onClick={(e) => { e.preventDefault(); setShowRepeatedPassword(!showRepeatedPassword) }}>
                    { showRepeatedPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
                  </button>
                </div>
                <p className="px-4 text-red-700 font-bold">{passwordMessage}</p>
              </div>
              <p
                id="register-message"
                className={`mb-5 text-center text-xl ${
                  registerMessage ===
                  strings.registerPage.form.registeredSuccess
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {registerMessage}
                {registerMessage ===
                strings.registerPage.form.registeredSuccess ? (
                  <Link className="underline" to="/login">
                    {strings.registerPage.form.registeredSuccessHere}
                  </Link>
                ) : null}
              </p>
              <input
                className="accept-button cursor-pointer"
                disabled={disabledButton}
                type="submit"
                value={strings.registerPage.form.submitButtonText}
              />
            </form>
            <GenerateAccount />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <LoadingComponent />
          </div>
        )}
      </div>
    </Page>
  );
}
