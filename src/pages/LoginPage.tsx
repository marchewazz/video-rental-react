import { useState } from "react";

import strings from "../utilities/strings";
import LoginFormData from "../models/LoginFormData.model";
import AuthService from "../services/AuthService.service";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [nick, setNick] = useState<string>("")
    const [nickMessage, setNickMessage] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")
    const [loginMessage, setLoginMessage] = useState<string>("")

    const navigate: NavigateFunction = useNavigate();

    function submitForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        let correct = true;
        if (!nick) {
            setNickMessage(strings.loginPage.form.missingNickOrEmail);
            correct = false;
        }
        if(!password) {
            setPasswordMessage(strings.loginPage.form.missingPassword)
            correct = false
        }
        if (correct) {
            const userData: LoginFormData = {
                userNick: nick,
                userPassword: password
            }

            const as: AuthService = new AuthService()
            
            as.loginUser(userData).then(async (res: any) => {
                console.log(res);
                const message: unknown = res.data.message;
                if (message === "logged") {
                    navigate("/")
                } else {
                    setLoginMessage(strings.loginPage.form[message as keyof typeof strings.loginPage.form] || "")
                }
            }).catch((e) => {
                setLoginMessage(strings.loginPage.form.errorMessage || "")
            }) 
        }
    }

    return (
        <main>
            <div className="container">
                <p>
                    { strings.loginPage.title }
                </p>
                <form onSubmit={submitForm}>
                    <div>
                        <input type="text" name="nick" onChange={(e) => {setNickMessage(""); setNick(e.target.value)}} />
                        <p>
                            { nickMessage }
                        </p>
                    </div>
                    <div>
                        <input type="password" name="passoword" onChange={(e) => {setPasswordMessage(""); setPassword(e.target.value)}} />
                        <p>
                            { passwordMessage }
                        </p>
                    </div>
                    <p>
                        { loginMessage }
                    </p>
                    <input type="submit" value={strings.loginPage.form.submitButtonText} />
                </form>
            </div>
        </main>
    )
}