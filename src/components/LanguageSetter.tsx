import { Dispatch, SetStateAction, useEffect } from "react"
import strings from "../utilities/strings"

export default function LanguageSetter(props: { languageReadyChangeFunction: Dispatch<SetStateAction<boolean>> }) {
    
    function changeLanguage(language: string): void {
        localStorage.setItem("language", language)
        window.location.reload();
    }

    useEffect(() => {
        if (localStorage.getItem("language") == "pl" || localStorage.getItem("language") == "en") strings.setLanguage(localStorage.getItem("language"))
        else localStorage.setItem("language", strings.getLanguage())
        props.languageReadyChangeFunction(true)
    }, [])
    
    return (
        <div className="p-4 gap-4 flex lg:gap-2 lg:p-0">
            <button className={`${strings.getLanguage() != "pl" ? "grayscale" : ""} hover:grayscale-0 transition-all duration-300 ease-in-out`} onClick={() => changeLanguage("pl")}>
                <img src="https://flagsapi.com/PL/shiny/32.png" />
            </button>
            <button className={`${strings.getLanguage() != "en" ? "grayscale" : ""} hover:grayscale-0 transition-all duration-300 ease-in-out`} onClick={() => changeLanguage("en")}>
                <img src="https://flagsapi.com/US/shiny/32.png" />
            </button>
        </div>
      
    )
}