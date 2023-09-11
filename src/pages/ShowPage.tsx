import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ShowsService from "../services/ShowsService.service";

import strings from "../utilities/strings";

export default function ShowPage() {
  const [showData, setShowData] = useState<any>();
  const [ready, setReady] = useState(false);

  const { showid } = useParams();

    const ss: ShowsService = new ShowsService()

  useEffect(() => {
    console.log(process.env.REACT_APP_OMDB_URL);
    ss.getShowData(showid || "")
      .then((res: any) => {
        console.log(res);
        
        setShowData(res.data);
        setReady(true);
      });
  }, []);

  return (
    <main>
         {ready ? (
            <>
                { showData.Response === "True" ? (
                    <>
                        <img src={showData.Poster} alt="" />
                        <p>
                            {showData.Title}
                        </p> 
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
