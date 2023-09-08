import { useState } from "react";

import strings from "../utilities/strings";
import LoginFormData from "../models/LoginForm.model";

export default function LoginPage() {

    const [nick, setNick] = useState<string>("")
    const [nickMessage, setNickMessage] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")
    const [loginMessage, setLoginMessage] = useState<string>("")

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
                    <input type="submit" value={strings.loginPage.form.submitButtonText} />
                </form>
            </div>
        </main>
    )
}