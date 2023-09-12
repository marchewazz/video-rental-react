import { useOutletContext } from "react-router-dom"
import strings from "../../utilities/strings";
import { useEffect } from "react";

export default function ShowDisplay(props: any) {

    const { userData, socket } = useOutletContext<any>();    

    const price: number = 5.50    

    function rentShow() {
        socket.emit("rentShow", {
            showID: props.showData.imdbID,
            rentPrice: price
        })
        socket.on("rentShow", (data: any) => {
            console.log(data);
        })
    }

    useEffect(() => {
      console.log(userData, props.showData);
      
    }, [userData])
    
    
    return (
        <div>
            <img src={props.showData.Poster} alt="" />
            <p>
                {props.showData.Title}
            </p> 
            {
                <>
                    { userData.userRentals.some((rental: any) => rental['rentalShowID'] === props.showData.imdbID && rental['rentalStatus'] === "active" ) ? (
                        <>
                            <button>
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