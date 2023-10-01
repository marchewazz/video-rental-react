import { Swiper, SwiperSlide } from "swiper/react";
import ShowsService from "../../services/ShowsService.service";
import { useEffect, useState } from "react";
import translate, { DeeplLanguages } from "deepl";
import strings from "../../utilities/strings";
import { Link, useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";

export default function MostPopularShowsSwiper() {

    const [mostPopularShows, setMostPopularShows] = useState<any[]>([])
    const [ready, setReady] = useState<boolean>(false)

    const mostPopularShowsIDs: string[] = ["tt0096697", "tt5180504", "tt2527336", "tt0117705", "tt3554046", "tt8289930"]

    const ss: ShowsService = new ShowsService()

    const { userData, userDataReady } = useOutletContext<Context>();

    useEffect(() => {

        let tempMostPopularShows: any[] = []

        mostPopularShowsIDs.forEach((recomendationID: any, index: number) => {
            ss.getShowData(recomendationID).then((res: any) => {
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
                        tempMostPopularShows.push(res.data)
                        if (index === mostPopularShowsIDs.length - 1) {
                            setMostPopularShows(tempMostPopularShows)
                            setReady(true)
                        }
                    })
                } else {
                    tempMostPopularShows.push(res.data)
                    if (index === mostPopularShowsIDs.length - 1) {
                        setMostPopularShows(tempMostPopularShows)
                        setReady(true)
                    }
                }
            })
        })
    }, [])

    return (
        <>
            { userDataReady && ready ? (
                <Swiper className="w-full"
                slidesPerView={1.7}
                spaceBetween={20}
                breakpoints={{
                    640: {
                       slidesPerView: 2.7,
                       spaceBetween: 30
                    },
                   //  768: {},
                    1024: {
                       slidesPerView: 3.7,
                    },
                   //  1280: {},
                   //  1536: {},
                }}>
                    { mostPopularShows.map((show: any, index: number) => {
                         return <SwiperSlide className="relative !h-auto group" key={index}>
                            <Link
                            className="relative rounded-3xl border-2 border-light-green flex h-full w-full"
                            to={`../show/${show.imdbID}`}
                            >
                                <img
                                  className={`${!show.Poster || show.Poster == "N/A" ? "justify-self-center self-center" : "" } rounded-3xl h-full w-full`}
                                  src={!show.Poster || show.Poster == "N/A" ? "images/no-image-icon.png" : show.Poster}
                                  alt=""
                                />
                                <div className="collapse rounded-3xl flex items-end absolute group-hover:visible w-full h-full bg-earie-black opacity-90 top-0 right-0 p-2 z-50">
                                  <p className="text-white font-bold text-2xl">
                                    {show.Title}
                                  </p>
                                </div>
                            </Link>
                         </SwiperSlide>
                    })}
                 </Swiper>
            ) : (
                <p>
                    Loading...
                </p>
            )}
        </>
    )
}