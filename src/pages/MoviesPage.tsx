import { useOutletContext } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import strings from "../utilities/strings";
import Page from "./Page";
import Context from "../models/Context.model";

export default function MoviesPage() {

    const { languageReady } = useOutletContext<Context>();

    return (
        <Page>
            <div className="container py-10">
                { languageReady ? (
                    <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                        { strings.moviesPage.title }
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