import { useOutletContext } from "react-router-dom"
import strings from "../../utilities/strings";
import { useEffect } from "react";

import Rental from "../../models/Rental.model";
import Context from "../../models/Context.model";

export default function ShowDisplay(props: any) {

    const { userData, socket } = useOutletContext<Context>();    

    const price: number = 5.50    

    function rentShow() {
        socket.emit("rentShow", {
            showID: props.showData.imdbID,
            rentPrice: price
        })
    }

    function cancelRent() {
        socket.emit("cancelRent", {
            rentalID: userData.userRentals.filter((rental: Rental) => rental['rentalShowID'] === props.showData.imdbID && rental['rentalStatus'] === "active" )[0].rentalID
        })
    }    

    function addToFavorites() {
        socket.emit("addToFavorites", { showID: props.showData.imdbID })
    }
    
    function removeFromFavorites() {
        socket.emit("removeFromFavorites", { showID: props.showData.imdbID })
    }
    
    return (
        <div>
            <img src={props.showData.Poster} alt="" />
            <p>
                {props.showData.Title}
            </p> 
            { userData.userLists[0].listShows.some((item: any) => item.showID === props.showData.imdbID) ? (
                <button onClick={removeFromFavorites}>{ strings.showPage.removeFromFavorites }</button>
            ) : (
                <button onClick={addToFavorites}>{ strings.showPage.addToFavorites }</button>
            )}
            {
                <>
                    { userData.userRentals.some((rental: any) => rental['rentalShowID'] === props.showData.imdbID && rental['rentalStatus'] === "active" ) ? (
                        <>
                            <button onClick={cancelRent}>
                                { strings.showPage.cancelButtonText }
                            </button>
                        </>
                    ) : (
                        userData.userBalance > price ? (
                            <button onClick={rentShow}>
                                { strings.formatString(strings.showPage.rentButton, { price: price.toString(), title: props.showData.Title}) }
                            </button>
                        ) : (
                            <p>
                                { strings.formatString(strings.showPage.notEnoughMoney, { price: price.toString()}) }
                            </p>
                        )
                    )}
                </>
            }
        </div>
    )
}