import { useEffect } from "react";

import strings from "../utilities/strings";

import { useOutletContext } from "react-router-dom";

import Context from "../models/Context.model";

export default function MainPage() {

    const { userData } = useOutletContext<Context>();    

    useEffect(() => {
      console.log(userData);
      
    }, [userData])

    return (
        <div>
            <p>
                { strings.mainPage.title }
            </p>
        </div>
    )
}