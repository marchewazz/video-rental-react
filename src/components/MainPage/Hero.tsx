import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import ShowsService from '../../services/ShowsService.service';
import strings from '../../utilities/strings';
import translate, { DeeplLanguages } from 'deepl';

import { Link } from 'react-router-dom';

export default function Hero() {

    const [recomendations, setRecomendations] = useState<any[]>([])
    const [ready, setReady] = useState<boolean>(false)

    const recomendationsIDs: string[] = ["tt0317219", "tt0126029", "tt0114709"]

    const ss: ShowsService = new ShowsService()

    const paginationRef = useRef(null)

    useEffect(() => {

        let tempRecomendations: any[] = []

        recomendationsIDs.forEach((recomendationID: any, index: number) => {
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
                        tempRecomendations.push(res.data)
                        if (index === recomendationsIDs.length - 1) {
                            setRecomendations(tempRecomendations)
                            setReady(true)
                        }
                    })
                } else {
                    tempRecomendations.push(res.data)
                    if (index === recomendationsIDs.length - 1) {
                        setRecomendations(tempRecomendations)
                        setReady(true)
                    }
                }
            })
        })
    }, [])
    

    return (
        <header className="bg-black h-[calc(100vh-100px)] lg:h-auto lg:min-h-[600px]">
            { ready ? (
                <Swiper
                className="relative h-full"
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination = {{ 
                    clickable: true,
                    el: paginationRef.current,
                    bulletClass: 'bg-white block w-6 h-6 rounded-full opacity-20 cursor-pointer',
                    bulletActiveClass: '!opacity-100',
                    renderBullet: function (index: number, className: string) {
                        return '<span class="' + className + '"></span>';
                    }
                }}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                breakpoints={{
                    1024: {
                        autoplay: {
                            delay: 10000,
                        }
                    }
                }}
                >
                { recomendations.map((recomendation: any, index: number) => {
                    return <SwiperSlide className="relative !h-auto" key={index}>
                        <img src={recomendation.Poster}
                        className="absolute w-full h-full object-fill blur-md -z-10" />
                        <div className="container flex flex-col justify-center lg:flex-row lg:justify-between pt-16 pb-20 min-h-full">
                            <div className="self-center lg:self-auto">
                                <img src={recomendation.Poster}
                                className="h-full w-auto lg:w-[500px] mb-5 lg:mb-0" />
                            </div>
                            <div className="flex flex-col justify-center lg:justify-normal bg-transparent lg:bg-gradient-to-l lg:to-transparent lg:via-earie-black lg:from-transparent to-[150%] via-[2%] w-full p-5 pr-[3%] opacity-90">
                                <h2 className="hidden lg:block text-white text-center lg:text-right text-5xl opacity-100">
                                    { recomendation.Title }
                                </h2>
                                <p className="hidden lg:block text-white text-center lg:text-right mt-5 text-xl xl:ml-32 mb-5">
                                    { strings.getLanguage() != "en" && recomendation.PlotTranslated ? (
                                    <>
                                        { recomendation.PlotTranslated }
                                        <span className="block text-gray-400 text-right text-base">
                                            { strings.util.translationInfo }
                                        </span>
                                    </>
                                    ) : (recomendation.Plot)}
                                </p>
                                <Link to={`/show/${recomendation.imdbID}`}
                                className="mt-auto bg-light-green self-center px-10 py-4 text-xl rounded-2xl border-2 border-white text-white transition-all duration-300 ease-in-out
                                hover:bg-white hover:text-light-green">
                                    { strings.mainPage.hero.rentNow }
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                })}
                <div className="flex justify-center bg-opacity-30 py-2 bg-black absolute bottom-0 z-10 gap-2 w-full" ref={paginationRef}></div>
                </Swiper>
            ) : (
                <div className="container">
                    <p>
                        Loading...
                    </p>
                </div>
            )}
            
        </header>
    )
}