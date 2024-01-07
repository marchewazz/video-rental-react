import { Swiper, SwiperSlide } from "swiper/react";
import ShowsService from "../../services/ShowsService.service";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import LoadingComponent from "../LoadingComponent";
import { animate, stagger } from "framer-motion";
import strings from "../../utilities/strings";

export default function MostPopularShowsSwiper() {

    const [mostPopularShows, setMostPopularShows] = useState<any[]>([])
    const [ready, setReady] = useState<boolean>(false)

    const mostPopularShowsIDs: string[] = ["tt0096697", "tt5180504", "tt2527336", "tt0117705", "tt3554046", "tt8289930"]

    const ss: ShowsService = new ShowsService()

    const { userData, userDataReady } = useOutletContext<Context>();

    useEffect(() => {

        let tempMostPopularShows: any[] = []

        Promise.all(mostPopularShowsIDs.map((recomendationID: string, index: number) => {
            ss.getShowData(recomendationID).then((res: any) => {
                tempMostPopularShows[index] = res.data
                if (index === mostPopularShowsIDs.length - 1) {
                    setMostPopularShows(tempMostPopularShows)
                    setReady(true)
                }
            })
        }))
    }, [])

    useEffect(() => {
      if (userDataReady && ready) animate(".most-popular-shows-slide", { x: [-300, 0], opacity: [0, 1] }, { delay: stagger(.2) })
    }, [userDataReady, ready])
    

    return (
        <>
            { userDataReady && ready ? (
                <Swiper className="w-full cursor-grab"
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
                         return <SwiperSlide className="most-popular-shows-slide relative !h-auto group" key={index}>
                            <Link
                            className="relative overflow-hidden rounded-3xl border-2 border-light-green flex h-full w-full"
                            to={`../show/${show.imdbID}`}
                            >
                                <img
                                  className={`${!show.Poster || show.Poster == "N/A" ? "justify-self-center self-center" : "" } rounded-3xl h-full w-full`}
                                  src={!show.Poster || show.Poster == "N/A" ? "images/no-image-icon.png" : show.Poster}
                                  alt=""
                                />
                                <div className="absolute list-show-rented-etiquete -rotate-45 bg-light-green text-center z-[100]">
                                    { strings.popUpNotifications.rented.toUpperCase() }
                                </div>
                                <div className="rounded-3xl flex items-end absolute group-hover:bg-black w-full h-full opacity-80 top-0 right-0 p-4 z-50 transition-all duration-300 ease-in-out">
                                    <p className="opacity-0 text-white font-bold text-2xl group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                      {show.Title}
                                    </p>
                                </div>
                            </Link>
                         </SwiperSlide>
                    })}
                 </Swiper>
            ) : (
                <div className="flex justify-center">
                    <LoadingComponent />
                </div>
            )}
        </>
    )
}