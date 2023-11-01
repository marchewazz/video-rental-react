import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import strings from "../utilities/strings";
import { useState } from "react";

export default function SearchBar() {

    const [searchPhrase, setSearchPhrase] = useState<string>("")
    
    const navigate = useNavigate();

    function searchForPhrase(e: any): void {
        e.preventDefault()

        navigate({
            pathname: `/search`, 
            search: `?${createSearchParams({"s": searchPhrase}).toString()}`})
    }

    return (
        <form className="m-4 lg:mx-0" onSubmit={searchForPhrase}>
            <input type="text" className="peer w-full outline-none border-2 border-dark-green rounded-2xl px-2 py-1 dark:bg-earie-black dark:text-light-green dark:border-light-green" placeholder={strings.nav.searchBar} onChange={(e) => setSearchPhrase(e.target.value)} />
            <p className="hidden peer-focus:block text-[.6rem] mt-1 text-white dark:text-light-green">{strings.nav.searchInfo}</p>
        </form>
    )
}