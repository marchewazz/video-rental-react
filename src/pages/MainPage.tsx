import { useEffect } from "react";

import strings from "../utilities/strings";

import { useOutletContext } from "react-router-dom";

export default function MainPage() {

    const { userData } = useOutletContext<any>();    

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