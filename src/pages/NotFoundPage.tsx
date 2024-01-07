import { NavigateFunction, useNavigate, useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";
import { useEffect } from "react";
import Page from "./Page";
import LoadingComponent from "../components/LoadingComponent";

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
        <Page>
            <div className="container py-10">
                <LoadingComponent />
            </div>
        </Page>
    )
}