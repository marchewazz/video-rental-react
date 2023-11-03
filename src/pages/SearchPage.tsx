import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";
import MostPopularShowsSwiper from "../components/MainPage/MostPopularShowsSwiper";
import LoadingComponent from "../components/LoadingComponent";
import UsersService from "../services/UsersService.service";
import Page from "./Page";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchResults, setSearchResults] = useState<{shows: any[], users: any[]}>({
    shows: [],
    users: []
  });
  const [ready, setReady] = useState<boolean>(false);

  const ss: ShowsService = new ShowsService();
  const us: UsersService = new UsersService();

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("s")) navigate("/");
    else {
      let searchResults: {
        shows: any[],
        users: { userID: string, userNick: string }[]
      } = {
        shows: [],
        users: []
      }
      setReady(false)
      ss.getSearch(searchParams.get("s") || "").then((res: any) => {
        if (res.data.Response === "True") searchResults.shows = res.data.Search.filter((show: any) => show.Type == "series" || show.Type == "movie")
        us.searchForUsers(searchParams.get("s") || "").then((res: any) => {
          searchResults.users = res.data.users
          setReady(true);
          setSearchResults(searchResults);
        })
      });
    }
  }, [searchParams]);

  return (
    <Page>
      <div className="container py-10">
        { ready ? (
          <>
            {searchResults.shows.length ? (
              <>
                <p className="text-4xl font-extrabold dark:text-white mb-5">
                  {strings.searchPage.title}
                  <span className="italic text-dark-green dark:text-light-green">
                    { searchParams.get("s")}
                  </span>
                </p>
                <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {searchResults.shows.map((show: any) => {
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
                        <div className="rounded-3xl flex items-end absolute group-hover:bg-black w-full h-full  opacity-80 top-0 right-0 p-4 z-50 transition-all duration-300 ease-in-out">
                          <p className="text-transparent text-white font-bold text-2xl group-hover:text-white transition-all duration-300 ease-in-out">
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
                <MostPopularShowsSwiper />
              </>
            )}
            <hr className="my-8 w-3/4 m-auto border-t-[3px]" />
            {searchResults.users.length ? (
              <>
                <p className="text-4xl font-extrabold dark:text-white">
                  {strings.searchPage.usersTitle}
                </p>
                <div className="flex flex-col">
                  { searchResults.users.map((user: { userID: string, userNick: string }, index: number) => {
                    return (<Link to={`/user/${user.userID}`} key={index}
                    className="text-dark-green dark:text-white p-3 text-xl hover:bg-earie-black hover:text-white">
                      { user.userNick }
                    </Link>)
                  })}
                </div>
              </>
            ) : (
              <p className="text-center text-4xl font-extrabold dark:text-white">
                  {strings.searchPage.notFoundUsers}
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <LoadingComponent />
          </div>
        )}
      </div>
    </Page>
  );
}
