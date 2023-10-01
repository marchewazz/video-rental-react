import { useEffect } from "react";

import strings from "../utilities/strings";

import { useOutletContext } from "react-router-dom";

import Context from "../models/Context.model";
import Hero from "../components/MainPage/Hero";

export default function MainPage() {

    const { userData } = useOutletContext<Context>();    

    return (
        <main className="main-background">
            <Hero />
        </main>
    )
}