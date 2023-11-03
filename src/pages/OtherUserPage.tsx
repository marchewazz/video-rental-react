import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import UsersService from "../services/UsersService.service"
import OtherUserDisplay from "../components/OtherUserDisplay/OtherUserDisplay";
import strings from "../utilities/strings";

import Context from "../models/Context.model";
import OtherUserDataResponse from "../models/responses/OtherUserDataResponse.model";
import LoadingComponent from "../components/LoadingComponent";
import Page from "./Page";

export default function OtherUserPage() {

    const us: UsersService = new UsersService();

    const { userid } = useParams();

    const { userData, socket, userDataReady } = useOutletContext<Context>();

    const navigate = useNavigate()

    const [response, setResponse] = useState<OtherUserDataResponse>()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (userDataReady) {
            us.getUserDataByID(userid || "").then((res: any) => {
                if (res.data.message === "userData") {
                    if (res.data.userData.userID === userData.userID) navigate("/myprofile") 
                }
                setReady(true)
                setResponse(res.data)
            })
        }
      
    }, [userDataReady])
    

    return (
        <Page>
            { ready && userDataReady && response ? (
                <>
                    { response.message === "userData" && response.userData ? (
                        <OtherUserDisplay otherUserData={response.userData} />
                    ) : (
                        <p>
                            { strings.otherUserPage.notFound }
                        </p>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center">
                    <LoadingComponent />
                </div>
            )}
        </Page>
    )
}