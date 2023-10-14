import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"

export default function ComparasionSwiper(props: any) {
    
    console.log(props);
    

    return (
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
                    { props.shows.map((show: any, index: number) => {
                         return <SwiperSlide className="relative !h-auto group" key={index}>
                            <Link
                            className="relative rounded-3xl border-2 border-light-green flex h-full w-full"
                            to={`../show/${show.showID}`}
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
    )
}