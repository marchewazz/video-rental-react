import { useLocation, useOutletContext } from "react-router-dom";
import strings from "../utilities/strings";
import Page from "./Page";
import Context from "../models/Context.model";
import LoadingComponent from "../components/LoadingComponent";

export default function CookiesPage() {

    const location = useLocation()

    const { userDataReady, languageReady } = useOutletContext<Context>();

    return (
        <Page>
            <div className="container py-10">
                {userDataReady && languageReady ? (
                    <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                        { location.state.fromPrivacy ? (
                            <>
                                { strings.cookiesPage.titleFromPrivacy }
                            </>
                        ) : (
                            <>
                                { strings.cookiesPage.titleDefault }
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