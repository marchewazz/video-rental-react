import { useEffect, useState } from "react"
import Rental from "../../models/Rental.model"
import { useOutletContext } from "react-router-dom"
import Context from "../../models/Context.model"
import ShowsService from "../../services/ShowsService.service"
import strings from "../../utilities/strings"
import RentalDisplay from "./RentalDisplay"
import LoadingComponent from "../LoadingComponent"

export default function UserRentals() {

    const [rentalsTab, setRentalsTab] = useState<string>("active")

    const [rentalsList, setRentalsList] = useState<Rental[]>()

    const [rentalsListReady, setRentalsListReady] = useState<boolean>(false)

    const { userData } = useOutletContext<Context>();

    const ss: ShowsService = new ShowsService();

    useEffect(() => {
        setRentalsListReady(false)
        const rentalsList = userData.userRentals.filter((rental: Rental) => rental.rentalStatus === rentalsTab);
        if (rentalsList.length) {
            Promise.all(rentalsList.map((rental: Rental, index: number) => {
                ss.getShowData(rental.rentalShowID).then((res: any) => {
                    if (res.data.Response != "True") {
                        rentalsList.splice(index - 1, 1)
                    } else {
                        rentalsList[index] = Object.assign(rentalsList[index], { rentalShowTitle: res.data.Title, rentalShowPoster: res.data.Poster })
                    }
                    if(index === rentalsList.length - 1) {
                        setRentalsListReady(true)
                        setRentalsList(rentalsList)
                    }
                })
            }))
        } else {
            setRentalsListReady(true)
            setRentalsList(rentalsList)
        }
    }, [rentalsTab])

    return (
        <div>
            <div className="grid grid-cols-3 my-5">
                <div>
                    <input className="peer hidden" type="radio" name="rentalsLists" id="active" checked={rentalsTab === "active"} onChange={() => setRentalsTab("active")} />
                    <label className="profile-tab-button rounded-l-full" htmlFor="active">
                        { strings.profilePage.nav.rentalsActive }
                    </label>
                </div>
                <div>
                    <input className="peer hidden" type="radio" name="rentalsLists" id="expired" checked={rentalsTab === "expired"} onChange={() => setRentalsTab("expired")} />
                    <label className="profile-tab-button" htmlFor="expired">
                        { strings.profilePage.nav.rentalsExpired }
                    </label>
                </div>
                <div>
                    <input className="peer hidden" type="radio" name="rentalsLists" id="cancelled" checked={rentalsTab === "cancelled"} onChange={() => setRentalsTab("cancelled")} />
                    <label className="profile-tab-button rounded-r-full" htmlFor="cancelled">
                        { strings.profilePage.nav.rentalsCancelled }
                    </label>
                </div>
            </div>
            <div className={`max-h-[540px] ${rentalsList?.length ? "overflow-y-auto" : ""}`}>
                { rentalsListReady ? (
                    <>
                        { rentalsList?.length ? (
                            rentalsList.map((rental: Rental, index: number) => {
                                return <RentalDisplay rental={rental} key={index} />
                            })
                        ) : (
                            rentalsTab === "active" ? (
                                <p className="text-center text-3xl lg:text-5xl text-gray-600 dark:text-white">
                                    { strings.profilePage.emptyActiveRentalsLists }
                                </p>
                            ) : (
                                <>
                                    { rentalsTab === "cancelled" ? (
                                        <p className="text-center text-3xl lg:text-5xl text-gray-600 dark:text-white">
                                            { strings.profilePage.emptyCancelledRentalsLists }
                                        </p>
                                    ) : (
                                        <p className="text-center text-3xl lg:text-5xl text-gray-600 dark:text-white">
                                            { strings.profilePage.emptyExpiredRentalsLists }
                                        </p>
                                    )}
                                </>
                            )
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center">
                        <LoadingComponent />
                    </div>
                ) }
            </div>
        </div>
    )
}