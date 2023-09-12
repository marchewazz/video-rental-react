import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";
import ShowDisplay from "../components/ShowPage/ShowDisplay";
import { useOutletContext } from "react-router-dom";

export default function ShowPage() {
  const [showData, setShowData] = useState<any>();
  const [ready, setReady] = useState(false);

  const { showid } = useParams();

  const { userDataReady } = useOutletContext<any>();  

  const ss: ShowsService = new ShowsService()

  useEffect(() => {
    ss.getShowData(showid || "")
      .then((res: any) => {
        setShowData(res.data);
        setReady(true);
      });
  }, []);

  return (
    <main>
         {ready && userDataReady ? (
            <>
                { showData.Response === "True" ? (
                    <>
                        <ShowDisplay showData={showData} />
                    </>
                ) : (
                    <p>
                        { strings.showPage.notFound }
                    </p>
                )}
            </>
            
            ) : ( 
            <p>Loading...</p>
         )}
    </main>
  );
}
