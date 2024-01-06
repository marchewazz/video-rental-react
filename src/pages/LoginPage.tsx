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

export default function LoginPage() {
  const [nick, setNick] = useState<string>("");
  const [nickMessage, setNickMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

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
          console.log(res);
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
                <input
                  className="text-input w-full"
                  placeholder={strings.loginPage.form.passPassword}
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setLoginMessage("");
                    setPasswordMessage("");
                    setPassword(e.target.value);
                  }}
                />
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
