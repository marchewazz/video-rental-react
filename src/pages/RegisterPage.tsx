import { useState } from "react";
import strings from "../utilities/strings";
import RegisterFormData from "../models/RegisterFormData.model";

import AuthService from "../services/AuthService.service";
import { Link } from "react-router-dom";

export default function RegisterPage() {

    const [nick, setNick] = useState<string>("")
    const [nickMessage, setNickMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [emailMessage, setEmailMessage] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatedPassword, setRepeatedPassword] = useState<string>("")
    const [passwordMessage, setPasswordMessage] = useState<string>("")
    const [registerMessage, setRegisterMessage] = useState<string>("")

    function submitForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        let correct = true;
        if (!nick) {
            setNickMessage(strings.registerPage.form.missingNick);
            correct = false;
        } else {
            if (nick.includes("@")) {
                setNickMessage(strings.registerPage.form.atSignInNick)
                correct = false
            }
        }
        if (!email) {
            setEmailMessage(strings.registerPage.form.missingEmail)
            correct = false
        } else {
            if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(email)) {
                setEmailMessage(strings.registerPage.form.wrongEmailFormat)
                correct = false
            }
        }
        if(!password || !repeatedPassword) {
            setPasswordMessage(strings.registerPage.form.missingPasswords)
            correct = false
        } else {
            if (password != repeatedPassword) {
                setPasswordMessage(strings.registerPage.form.passwordNotTheSame)
                correct = false
            }
            if (!new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$").test(password) || !new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$").test(repeatedPassword)) {
                setPasswordMessage(strings.registerPage.form.wrongPasswordFormat)
                correct = false
            }
        }
        if (correct) {
            
            
            const userData: RegisterFormData = {
                userNick: nick,
                userEmail: email,
                userPassword: password
            }

            const as: AuthService = new AuthService()
            
            as.registerUser(userData).then(async (res: any) => {
                const message: unknown = res.data.message;
                console.log(message as keyof typeof strings.registerPage.form);
                
                setRegisterMessage(strings.registerPage.form[message as keyof typeof strings.registerPage.form] || "")
            }).catch((e) => {
                setRegisterMessage(strings.registerPage.form.errorMessage || "")
            }) 
        }
        
    }

    return (
        <main>
            <div className="container">
                <p>
                    { strings.registerPage.title }
                </p>
                <form onSubmit={submitForm}>
                    <div>
                        <input type="text" name="nick" onChange={(e) => {setNickMessage(""); setNick(e.target.value)}} />
                        <p>
                            { nickMessage }
                        </p>
                    </div>
                    <div>
                        <input type="text" name="email" onChange={(e) => {setEmailMessage(""); setEmail(e.target.value)}} />
                        <p>
                            { emailMessage }
                        </p>
                    </div>
                    <div>
                        <input type="password" name="passoword" onChange={(e) => {setPasswordMessage(""); setPassword(e.target.value)}} />
                        <input type="password" name="repeatedPassoword" onChange={(e) => {setPasswordMessage(""); setRepeatedPassword(e.target.value)}} />
                        <p>
                            { passwordMessage }
                        </p>
                    </div>
                    <p id="register-message">
                        { registerMessage }
                        { registerMessage === strings.registerPage.form.registeredSuccess ? (
                            <Link to="/login">{strings.registerPage.form.registeredSuccessHere}</Link>
                        ) : (null)}
                    </p>
                    <input type="submit" value={strings.registerPage.form.submitButtonText} />
                </form>
            </div>
        </main>
    )
}