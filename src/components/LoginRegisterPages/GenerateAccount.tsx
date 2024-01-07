import { useState } from "react"
import strings from "../../utilities/strings"
import AuthService from "../../services/AuthService.service";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPaste } from "@fortawesome/free-solid-svg-icons";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function GenerateAccount() {

    const [accountData, setAccountData] = useState<{
        email: string,
        nick: string,
        password: string,
    }>()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>("")

    const [disabledButton, setDisabledButton] = useState<boolean>(false)

    const navigate: NavigateFunction = useNavigate();

    const as: AuthService = new AuthService();

    function generateAccount(): void {
        setDisabledButton(true)
        setShowPassword(false)
        setErrorMessage("")
     
        as.generateUser().then((res: any) => {
           if (res.data.message == "registeredSuccess") {
            setAccountData({
                email: res.data.email,
                nick: res.data.nick,
                password: res.data.password
            })
           } else {
            setErrorMessage(strings.loginPage.form.errorMessage || "");
           }
        }).catch((e) => {
            setErrorMessage(strings.loginPage.form.errorMessage || "");
        });
        setDisabledButton(false)
    }

    function login(): void {
        if (accountData?.nick) {
            setDisabledButton(true)
            as.loginUser({ userNick: accountData.nick, userPassword: accountData.password })
            .then(async (res: any) => {
              const message: unknown = res.data.message;
              if (message === "logged") {
                localStorage.setItem("token", res.data.token);
                navigate("/");
              } else {
                setErrorMessage(strings.loginPage.form[message as keyof typeof strings.loginPage.form] || "");
              }
              setDisabledButton(false);
            })
        .catch((e) => {
          setErrorMessage(strings.loginPage.form.errorMessage || "");
          setDisabledButton(false);
        });
        }
    }

    return (
        <div className="border w-full lg:w-3/5 border-dark-green dark:border-light-green rounded-lg bg-light-green dark:bg-earie-black p-4 text-dark-green dark:text-white mt-5 flex flex-col gap-2 self-center text-lg">
            { accountData?.email && accountData.nick && accountData.password ? (
                <>
                    <div className="flex justify-between">
                        <p>
                            <span>Email: </span>
                            <span>{ accountData.email }</span>
                        </p>
                        <CopyToClipboard text={accountData.email}>
                            <button className="hover:scale-110 transition-all duration-100 ease-in-out"><FontAwesomeIcon icon={faPaste} /></button>
                        </CopyToClipboard>
                    </div>
                    <div className="flex justify-between">
                        <p>
                            <span>Nick: </span>
                            <span>{ accountData.nick }</span>
                        </p>
                        <CopyToClipboard text={accountData.nick}>
                            <button className="hover:scale-110 transition-all duration-100 ease-in-out"><FontAwesomeIcon icon={faPaste} /></button>
                        </CopyToClipboard>
                    </div>
                    <div className="flex justify-between">
                        <p>
                            <span>{ strings.loginPage.form.generateAccountPassword }</span>
                            <span>{ showPassword ? (accountData.password) : "*****" }</span>
                        </p>
                        <div className="flex gap-2">
                            <button className="hover:scale-110 transition-all duration-100 ease-in-out" onClick={() => setShowPassword(!showPassword)}>{ showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }</button>
                            <CopyToClipboard text={accountData.password}>
                                <button className="hover:scale-110 transition-all duration-100 ease-in-out"><FontAwesomeIcon icon={faPaste} /></button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <button onClick={login} disabled={disabledButton} className="accept-button w-fit self-center px-12 py-2">
                        { strings.loginPage.form.submitButtonText }
                    </button>
                </>
            ) : (null)}
             <p className="text-xl italic">
                { strings.loginPage.form.generateAccount } {" "}
                <button disabled={disabledButton} className="underline" onClick={generateAccount}>{ strings.registerPage.form.registeredSuccessHere }</button>
            </p>
            { errorMessage ? (
                <p className="text-red-700">
                    { errorMessage }
                </p>
            ) : (null)}
        </div>
    )
}