import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResults, setSearchResults] = useState<any>({});
  const [ready, setReady] = useState<boolean>(false);

  const ss: ShowsService = new ShowsService();

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("s")) navigate("/");
    else {
      setReady(false)
      ss.getSearch(searchParams.get("s") || "").then((res: any) => {
        console.log(res);
        res.data.Search = res.data.Search.filter((show: any) => show.Type != "game")
        res.data.Search[0].Poster = "N/A"
        res.data.Search[1].Poster = ""
        setReady(true);
        setSearchResults(res.data);
      });
    }
  }, [searchParams]);

  return (
    <main className="main-background">
      <div className="container py-10">
        {ready && searchResults ? (
          <>
            {searchResults.Response === "True" ? (
              <>
                <p className="text-4xl font-extrabold dark:text-white mb-5">
                  {strings.searchPage.title}
                  <span className="italic text-dark-green dark:text-light-green">
                    { searchParams.get("s")}
                  </span>
                </p>
                <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {searchResults.Search.map((show: any) => {
                    return (
                      <Link
                        className="group relative rounded-3xl border-2 border-light-green flex"
                        to={`../show/${show.imdbID}`}
                      >
                        <img
                          className={`${!show.Poster || show.Poster == "N/A" ? "justify-self-center self-center" : "w-full h-full" } rounded-3xl`}
                          src={!show.Poster || show.Poster == "N/A" ? "images/no-image-icon.png" : show.Poster}
                          alt=""
                        />
                        <div className="collapse rounded-3xl flex items-end absolute group-hover:visible w-full h-full bg-earie-black opacity-90 top-0 right-0 p-2 z-50">
                          <p className="text-white font-bold text-2xl">
                            {show.Title}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <p className="text-center text-4xl font-extrabold dark:text-white mb-5">
                  {strings.searchPage.notFoundTitle}
                  <span className="italic text-dark-green dark:text-light-green">
                    { searchParams.get("s")}
                  </span>
                </p>
                <p className="text-center text-3xl font-semibold dark:text-white mb-5">
                  {strings.formatString(strings.searchPage.notFoundSubTitle)}
                </p>
              </>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
