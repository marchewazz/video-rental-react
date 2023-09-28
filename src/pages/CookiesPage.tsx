import { useLocation } from "react-router-dom";
import strings from "../utilities/strings";

export default function CookiesPage() {

    const location = useLocation()

    return (
        <main className="main-background">
            <div className="container py-10">
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
            </div>
        </main>
    )
}