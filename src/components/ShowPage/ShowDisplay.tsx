import { useOutletContext } from "react-router-dom"
import strings from "../../utilities/strings";
import { useEffect, useRef, useState } from "react";

import Rental from "../../models/Rental.model";
import Context from "../../models/Context.model";
import generateRandomString from "../../utilities/randomString";
import PopUpMessage from "../../models/PopUpMessage.model";

export default function ShowDisplay(props: any) {

    const { userData, socket } = useOutletContext<Context>();    

    const [disableAddToFavoritesButton, setDisableAddToFavoritesButton] = useState<string>("")
    const [disableRemoveFromFavoritesButton, setDisableRemoveFromFavoritesButton] = useState<string>("")
    const [disableRentButton, setDisableRentButton] = useState<string>("")
    const [disableCancelRentButton, setDisableCancelRentButton] = useState<string>("")

    const disableAddToFavoritesButtonRef = useRef<string>(disableAddToFavoritesButton);
    const disableRemoveFromFavoritesButtonRef = useRef<string>(disableRemoveFromFavoritesButton);
    const disableRentButtonRef = useRef<string>(disableCancelRentButton);
    const disableCancelRentButtonRef = useRef<string>(disableCancelRentButton);

    const price: number = 5.50    

    function rentShow() {
        const eventID = `rent-${generateRandomString(48)}`
        setDisableRentButton(eventID)
        socket.emit("rentShow", {
            showID: props.showData.imdbID,
            rentPrice: price,
            eventID: eventID
        })
    }

    function cancelRent() {
        const eventID = `cancel-rent-${generateRandomString(48)}`
        setDisableCancelRentButton(eventID)
        socket.emit("cancelRent", {
            rentalID: userData.userRentals.filter((rental: Rental) => rental['rentalShowID'] === props.showData.imdbID && rental['rentalStatus'] === "active" )[0].rentalID,
            eventID: eventID
        })
    }    

    function addToFavorites() {
        const eventID = `add-to-favorites-${generateRandomString(48)}`
        setDisableAddToFavoritesButton(eventID)
        socket.emit("addToFavorites", { showID: props.showData.imdbID, eventID: eventID })
    }
    
    function removeFromFavorites() {
        const eventID = `remove-from-favorites-${generateRandomString(48)}`
        setDisableRemoveFromFavoritesButton(eventID)
        socket.emit("removeFromFavorites", { showID: props.showData.imdbID, eventID: eventID })
    }
    
    useEffect(() => {
        if (socket) {
          socket.on("emitPopUpNotification", (data: PopUpMessage) => {
            if (data.eventID === disableAddToFavoritesButtonRef.current) setDisableAddToFavoritesButton("")
            if (data.eventID === disableRemoveFromFavoritesButtonRef.current) setDisableRemoveFromFavoritesButton("")
            if (data.eventID === disableRentButtonRef.current) setDisableRentButton("")
            if (data.eventID === disableCancelRentButtonRef.current) setDisableCancelRentButton("")
          })
        }
    }, [socket])
    
    useEffect(() => {
      disableAddToFavoritesButtonRef.current = disableAddToFavoritesButton
    }, [disableAddToFavoritesButton])

    useEffect(() => {
      disableRemoveFromFavoritesButtonRef.current = disableRemoveFromFavoritesButton
    }, [disableRemoveFromFavoritesButton])

    useEffect(() => {
      disableRentButtonRef.current = disableRentButton
    }, [disableRentButton])

    useEffect(() => {
      disableCancelRentButtonRef.current = disableCancelRentButton
    }, [disableCancelRentButton])
    

    return (
        <div>
            <img src={props.showData.Poster} alt="" />
            <p>
                {props.showData.Title}
            </p> 
            { userData.userLists[0].listShows.some((item: any) => item.showID === props.showData.imdbID) ? (
                <button disabled={disableRemoveFromFavoritesButton != ""} onClick={removeFromFavorites}>{ strings.showPage.removeFromFavorites }</button>
            ) : (
                <button disabled={disableAddToFavoritesButton != ""} onClick={addToFavorites}>{ strings.showPage.addToFavorites }</button>
            )}
            {
                <>
                    { userData.userRentals.some((rental: any) => rental['rentalShowID'] === props.showData.imdbID && rental['rentalStatus'] === "active" ) ? (
                        <>
                            <button disabled={disableCancelRentButton != ""} onClick={cancelRent}>
                                { strings.showPage.cancelButtonText }
                            </button>
                        </>
                    ) : (
                        userData.userBalance > price ? (
                            <button disabled={disableRentButton != ""} onClick={rentShow}>
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