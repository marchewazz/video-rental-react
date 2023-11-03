import strings from "../utilities/strings";
import Page from "./Page";

export default function SeriesPage() {
    return (
        <Page>
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                    { strings.seriesPage.title }
                </p>
            </div>
        </Page>
    )
}