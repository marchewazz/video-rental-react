import { NavigateFunction, useNavigate, useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";
import { useEffect } from "react";

export default function NotFoundPage() {

    const { userDataReady, isUserLogged } = useOutletContext<Context>();

    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {   
        if(userDataReady) {
            if (isUserLogged) navigate("/")
            else navigate("/login")
        }
    }, [userDataReady])
    

    return (
        <main className="main-background">
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                    Loading...
                </p>
            </div>
        </main>
    )
}