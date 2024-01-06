import strings from "../utilities/strings";
import Hero from "../components/MainPage/Hero";
import MostPopularShowsSwiper from "../components/MainPage/MostPopularShowsSwiper";
import { motion } from "framer-motion";
import Page from "./Page";
import LoadingComponent from "../components/LoadingComponent";
import { useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";

export default function MainPage() { 

    const { languageReady } = useOutletContext<Context>();

    return (
        <Page>
             { languageReady ? (
                <>
                    <Hero />
                    <div className="container py-10">
                        <p className="text-4xl lg:text-6xl font-extrabold text-dark-green dark:text-light-green italic mb-5">
                            { strings.mainPage.mostPopularShowsSwiper.title }
                        </p>
                        <MostPopularShowsSwiper />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center">
                  <LoadingComponent />
                </div>
            )}
        </Page>
    )
}