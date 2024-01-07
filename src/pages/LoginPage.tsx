import { useState } from "react";

import strings from "../utilities/strings";
import LoginFormData from "../models/LoginFormData.model";
import AuthService from "../services/AuthService.service";
import {
  NavigateFunction,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Page from "./Page";
import LoadingComponent from "../components/LoadingComponent";
import Context from "../models/Context.model";
import GenerateAccount from "../components/LoginRegisterPages/GenerateAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [nick, setNick] = useState<string>("");
  const [nickMessage, setNickMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [disabledButton, setDisabledButton] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  const { languageReady } = useOutletContext<Context>();

  function submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    let correct = true;
    if (!nick) {
      setNickMessage(strings.loginPage.form.missingNickOrEmail);
      correct = false;
    }
    if (!password) {
      setPasswordMessage(strings.loginPage.form.missingPassword);
      correct = false;
    }
    if (correct) {
      const userData: LoginFormData = {
        userNick: nick,
        userPassword: password,
      };

      const as: AuthService = new AuthService();
      setDisabledButton(true);
      as.loginUser(userData)
        .then(async (res: any) => {
          const message: unknown = res.data.message;
          if (message === "logged") {
            localStorage.setItem("token", res.data.token);
            navigate("/");
          } else {
            setLoginMessage(
              strings.loginPage.form[
                message as keyof typeof strings.loginPage.form
              ] || ""
            );
          }
          setDisabledButton(false);
        })
        .catch((e) => {
          setLoginMessage(strings.loginPage.form.errorMessage || "");
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
              {strings.loginPage.title}
            </p>
            <form onSubmit={submitForm} className="flex flex-col self-center">
              <div>
                <input
                  className="text-input w-full"
                  placeholder={strings.loginPage.form.passEmailOrNick}
                  type="text"
                  name="nick"
                  onChange={(e) => {
                    setLoginMessage("");
                    setNickMessage("");
                    setNick(e.target.value);
                  }}
                />
                <p className="px-4 text-red-700 font-bold">{nickMessage}</p>
              </div>
              <div className="my-5">
                <div className="relative">
                  <input
                    className="text-input w-full pr-10"
                    placeholder={strings.loginPage.form.passPassword}
                    type={ showPassword ? "text" : "password" }
                    name="password"
                    onChange={(e) => {
                      setLoginMessage("");
                      setPasswordMessage("");
                      setPassword(e.target.value);
                    }}
                  />
                  <button className="absolute hover:scale-110 transition-all duration-100 ease-in-out text-white h-full w-10 right-0" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }}>
                    { showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
                  </button>
                </div>
                <p className="px-4 text-red-700 font-bold">{passwordMessage}</p>
              </div>
              <p className="px-4 mb-5 text-red-700 font-bold">{loginMessage}</p>
              <input
                className="accept-button cursor-pointer"
                disabled={disabledButton}
                type="submit"
                value={strings.loginPage.form.submitButtonText}
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
