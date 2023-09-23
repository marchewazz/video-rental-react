import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";
import ShowDisplay from "../components/ShowPage/ShowDisplay";

import { Params, useOutletContext } from "react-router-dom";
import Context from "../models/Context.model";

export default function ShowPage() {
  const [showData, setShowData] = useState<any>();
  const [ready, setReady] = useState<boolean>(false);

  const { showid }: Readonly<Params<string>> = useParams<string>();

  const { userDataReady } = useOutletContext<Context>();

  const ss: ShowsService = new ShowsService();

  useEffect(() => {
    ss.getShowData(showid || "").then((res: any) => {
      console.log(res);
      
      setShowData(res.data);
      setReady(true);
    });
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
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
