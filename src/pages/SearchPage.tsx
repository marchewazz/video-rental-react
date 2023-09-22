import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";

export default function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchResults, setSearchResults] = useState<any>({})
    const [ready, setReady] = useState<boolean>(false)

    const ss: ShowsService = new ShowsService()

    const navigate = useNavigate();

    useEffect(() => {
      if (!searchParams.get("s")) navigate("/")
      else {
        ss.getSearch(searchParams.get("s") || "").then((res: any) => {
            console.log(res);  
            setReady(true)
            setSearchResults(res.data)
        })
        }
    }, [searchParams])
    

    return (
        <div className="container">
            { ready && searchResults ? (
                <>
                    { searchResults.Response === "True" ? (
                        <>
                            <p>
                                { strings.formatString(strings.searchPage.title, { phrase: searchParams.get("s") || ""}) }
                            </p>
                            <div className="grid grid-cols-4">
                                { searchResults.Search.map((show: any) => {
                                    return <Link to={`../show/${show.imdbID}`}>
                                        <img src={show.Poster} alt="" />
                                    </Link>
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <p>
                                { strings.formatString(strings.searchPage.notFoundTitle, { phrase: searchParams.get("s") || ""}) }
                            </p>
                            <p>
                                { strings.formatString(strings.searchPage.notFoundSubTitle) }
                            </p>
                        </>
                    )}
                </>
            ) : (
                <p>
                    Loading...
                </p>
            )}
        </div>
    )
}