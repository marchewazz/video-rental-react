import { useLocation, useOutletContext } from "react-router-dom";
import strings from "../utilities/strings";
import Page from "./Page";
import LoadingComponent from "../components/LoadingComponent";
import Context from "../models/Context.model";

export default function PrivacyPolicyPage() {

    const location = useLocation()

    const { languageReady } = useOutletContext<Context>();

    return (
        <Page>
            <div className="container py-10">
                { languageReady ? (
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
                ) : (
                    <div className="flex items-center justify-center">
                      <LoadingComponent />
                    </div>
                )}
            </div>
        </Page>
    )
}