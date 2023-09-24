import { useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";
import { useState } from "react";
import UserEditForm from "../components/UserPage/UserEditForm";
import UserDataDisplay from "../components/UserPage/UserDataDisplay";
import UserLists from "../components/UserPage/UserLists";
import strings from "../utilities/strings";

export default function UserPage() {

    const { userDataReady } = useOutletContext<Context>();

    const [showEditForm, setShowEditForm] = useState<boolean>(false)

    return (
        <main className="main-background">
            <div className="container py-10">
                <h3 className="font-semibold text-6xl italic text-dark-green dark:text-light-green mb-10">
                    { strings.profilePage.title }
                </h3>
                { userDataReady ? (
                    <div>
                        { showEditForm ? (
                            <UserEditForm />
                        ) : (
                            <UserDataDisplay />
                        )}
                        <UserLists />
                    </div>
                ) : (
                    <p>
                        Loading...
                    </p>
                )}
            </div>
        </main>
    )
}