import { useLocation } from "react-router-dom";
import strings from "../utilities/strings";
import Page from "./Page";

export default function PrivacyPolicyPage() {

    const location = useLocation()

    return (
        <Page>
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                    { location.state.fromCookies ? (
                        <>
                            { strings.privacyPage.titleFromCookies }
                        </>
                    ) : (
                        <>
                            { strings.privacyPage.titleDefault }
                        </>
                    )}
                </p>
            </div>
        </Page>
    )
}