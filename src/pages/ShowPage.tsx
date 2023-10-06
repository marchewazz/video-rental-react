import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";
import ShowDisplay from "../components/ShowPage/ShowDisplay";

import { Params, useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";

import translate, { DeeplLanguages } from "deepl";
import LoadingComponent from "../components/LoadingComponent";

export default function ShowPage() {
  const [showData, setShowData] = useState<any>();
  const [ready, setReady] = useState<boolean>(false);

  const { showid }: Readonly<Params<string>> = useParams<string>();

  const { userDataReady } = useOutletContext<Context>();

  const ss: ShowsService = new ShowsService();

  useEffect(() => {
    ss.getShowData(showid || "").then(async (res: any) => {
      if (res.data.Type != "movie" && res.data.Type != "series") setShowData({ Response: "False" })
      else {
        if (strings.getLanguage() != "en") {
          translate({
            free_api: true,
            text: res.data.Plot,
            target_lang: strings.getLanguage() as unknown as DeeplLanguages,
            auth_key: process.env.REACT_APP_DEEPL_AUTH || ""
          }).then((translationRes: any) => {
            res.data.PlotTranslated = translationRes.data.translations[0].text
          }).catch((e) => {
            console.log(e);
          }).finally(() => {
            setShowData(res.data)
            setReady(true);
          })
        } else {
          setShowData(res.data)
          setReady(true);
        }
      };
    })
  }, []);

  return (
    <main className="main-background">
      <div className="container py-10">
        {ready && userDataReady ? (
          <>
            {showData.Response === "True" ? (
              <>
                <ShowDisplay showData={showData} />
              </>
            ) : (
              <p>{strings.showPage.notFound}</p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <LoadingComponent />
          </div>
        )}
      </div>
    </main>
  );
}
