import strings from "../utilities/strings";
import Page from "./Page";

export default function MoviesPage() {
    return (
        <Page>
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                    { strings.moviesPage.title }
                </p>
            </div>
        </Page>
    )
}