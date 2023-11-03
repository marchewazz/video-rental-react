import strings from "../utilities/strings";
import Hero from "../components/MainPage/Hero";
import MostPopularShowsSwiper from "../components/MainPage/MostPopularShowsSwiper";
import { motion } from "framer-motion";
import Page from "./Page";

export default function MainPage() { 

    return (
        <Page>
            <Hero />
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl font-extrabold text-dark-green dark:text-light-green italic mb-5">
                    { strings.mainPage.mostPopularShowsSwiper.title }
                </p>
                <MostPopularShowsSwiper />
            </div>
        </Page>
    )
}