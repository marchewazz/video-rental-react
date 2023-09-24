import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import List from "../../models/List.model";
import ShowsService from "../../services/ShowsService.service";
import strings from "../../utilities/strings";

export default function UserLists() {

    const [selectedList, setSelectedList] = useState<List>()
    const [selectedListIndex, setSelectedListIndex] = useState<number>(0)

    const [listReady, setListReady] = useState<boolean>(false)

    const { userData } = useOutletContext<Context>();

    const ss: ShowsService = new ShowsService()

    useEffect(() => {
        setListReady(false)
        const list = userData.userLists[selectedListIndex];
        if (list.listShows.length) {
            list.listShows.forEach((show: any, index: number) => {
                ss.getShowData(show.showID).then((res: any) => {
                    if (res.data.Response != "True") {
                        list.listShows.splice(index, 1)
                    } else {
                        list.listShows[index] = {
                            showID: show.showID,
                            Poster: res.data.Poster,
                            Title: res.data.Title
                        }
                    }
                    if(index === list.listShows.length - 1) {
                        setListReady(true)
                        setSelectedList(list)
                    }
                })
            });
        } else {
            setListReady(true)
            setSelectedList(list)
        }
    }, [selectedListIndex])
    

    return (
        <div>
            <div>
                <select onChange={(e) => setSelectedListIndex(Number(e.target.value))}>
                    { userData.userLists.map((list: List, index: number) => {
                        return <option value={index} selected={index === selectedListIndex}>
                            { list.listName === "default-favorites" ? (
                                <>
                                    { strings.profilePage.favorites }
                                </>
                            ) : (
                                <>
                                    { list.listName }
                                </>
                            ) }
                        </option>
                    })}
                </select>
            </div>
            { listReady ? (
                <>
                    { selectedList?.listShows.length ? (
                        <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            { selectedList?.listShows.map((show: any, index: number) => {
                                return <Link to={`/show/${show.showID}`} key={index}
                                className="group hover:scale-110 transition-all duration-200 ease-in-out">
                                    <div className="relative overflow-hidden rounded-3xl border-2 flex border-light-green w-full h-full">
                                        <img className={`${!show.Poster || show.Poster == "N/A" ? "justify-self-center self-center" : "w-full h-full" } rounded-3xl`}
                                        src={!show.Poster || show.Poster == "N/A" ? "images/no-image-icon.png" : show.Poster} />
                                        { userData.userRentals.some((rental: any) => rental["rentalShowID"] === show.showID && rental["rentalStatus"] === "active") ? (
                                        <div className="absolute list-show-rented-etiquete -rotate-45 bg-light-green text-center">
                                            { strings.popUpNotifications.rented.toUpperCase() }
                                        </div>
                                        ) : (null)}
                                    </div>
                                    <p className="text-center dark:text-white text-xl">
                                        { show.Title }
                                    </p>
                                </Link>
                            }) }
                        </div>
                    ) : (
                        <p>
                            { strings.profilePage.emptyList }
                        </p>
                    )}
                </>
            ) : (
                <p>
                    Loading...
                </p>
            )}
            
        </div>
    )
}