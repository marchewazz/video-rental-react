import { useEffect, useState } from "react"
import Rental from "../../models/Rental.model"
import { useOutletContext } from "react-router-dom"
import Context from "../../models/Context.model"
import ShowsService from "../../services/ShowsService.service"
import strings from "../../utilities/strings"
import RentalDisplay from "./RentalDisplay"

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
            rentalsList.forEach((rental: Rental, index: number) => {
                ss.getShowData(rental.rentalShowID).then((res: any) => {
                    if (res.data.Response != "True") {
                        rentalsList.splice(index, 1)
                    } else {
                        rentalsList[index] = Object.assign(rentalsList[index], { rentalShowTitle: res.data.Title, rentalShowPoster: res.data.Poster })
                    }
                    if(index === rentalsList.length - 1) {
                        console.log(rentalsList);
                        
                        setRentalsListReady(true)
                        setRentalsList(rentalsList)
                    }
                })
            });
        } else {
            setRentalsListReady(true)
            setRentalsList(rentalsList)
        }
    }, [rentalsTab])

    return (
        <div>
            <div>
                <div>
                    <label htmlFor="active">
                        active
                    </label>
                    <input type="radio" name="rentalsLists" id="active" checked={rentalsTab === "active"} onChange={() => setRentalsTab("active")} />
                </div>
                {/* <div>
                    <label htmlFor="expired">
                        expired
                    </label>
                    <input type="radio" name="rentalsLists" id="expired" checked={rentalsTab === "expired"} onChange={() => setRentalsTab("expired")} />
                </div> */}
                <div>
                    <label htmlFor="cancelled">
                        cancelled
                    </label>
                    <input type="radio" name="rentalsLists" id="cancelled" checked={rentalsTab === "cancelled"} onChange={() => setRentalsTab("cancelled")} />
                </div>
            </div>
            <div>
                { rentalsListReady ? (
                    <>
                        { rentalsList?.length ? (
                            rentalsList.map((rental: Rental, index: number) => {
                                return <RentalDisplay rental={rental} key={index} />
                            })
                        ) : (
                            rentalsTab === "active" ? (
                                <p>
                                    { strings.profilePage.emptyActiveRentalsLists }
                                </p>
                            ) : (
                                <p>
                                    { strings.profilePage.emptyCancelledRentalsLists }
                                </p>
                            )
                        )}
                    </>
                ) : (
                    <p>
                        Loading...
                    </p>
                ) }
            </div>
        </div>
    )
}