import { useEffect } from "react";

import strings from "../utilities/strings";

import { useOutletContext } from "react-router-dom";

import Context from "../models/Context.model";
import Hero from "../components/MainPage/Hero";
import MostPopularShowsSwiper from "../components/MainPage/MostPopularShowsSwiper";
import LoadingComponent from "../components/LoadingComponent";

export default function MainPage() {

    const { userData } = useOutletContext<Context>();    

    return (
        <main className="main-background">
            <Hero />
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl font-extrabold text-dark-green dark:text-light-green italic mb-5">
                    { strings.mainPage.mostPopularShowsSwiper.title }
                </p>
                <MostPopularShowsSwiper />
            </div>
        </main>
    )
}