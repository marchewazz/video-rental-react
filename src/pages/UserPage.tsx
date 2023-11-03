import { useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";

import UserDataDisplay from "../components/UserPage/UserDataDisplay";
import UserDataLists from "../components/UserPage/UserDataLists";

import strings from "../utilities/strings";
import LoadingComponent from "../components/LoadingComponent";
import Page from "./Page";

export default function UserPage() {

    const { userDataReady } = useOutletContext<Context>();

    return (
        <Page>
            <div className="container py-10">
                <h3 className="font-semibold text-6xl italic text-dark-green dark:text-light-green mb-10">
                    { strings.profilePage.title }
                </h3>
                { userDataReady ? (
                    <div>
                        <UserDataDisplay />
                        <UserDataLists />
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <LoadingComponent />
                    </div>
                )}
            </div>
        </Page>
    )
}