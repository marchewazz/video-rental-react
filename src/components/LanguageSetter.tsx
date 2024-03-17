import { Dispatch, SetStateAction, useEffect } from "react"
import strings from "../utilities/strings"

export default function LanguageSetter(props: { languageChangeFunction: Function }) {
    
    return (
        <div className="p-4 gap-4 flex lg:gap-2 lg:p-0">
            <button className={`${strings.getLanguage() != "pl" ? "grayscale" : ""} hover:grayscale-0 transition-all duration-300 ease-in-out`} onClick={() => props.languageChangeFunction("pl")}>
                <img className="rounded-full" src="https://flagsapi.com/PL/shiny/32.png" />
            </button>
            <button className={`${strings.getLanguage() != "en" ? "grayscale" : ""} hover:grayscale-0 transition-all duration-300 ease-in-out`} onClick={() => props.languageChangeFunction("en")}>
                <img className="rounded-full" src="https://flagsapi.com/US/shiny/32.png" />
            </button>
        </div>
      
    )
}