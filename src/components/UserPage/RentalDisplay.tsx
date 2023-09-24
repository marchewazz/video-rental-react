import { Link } from "react-router-dom";
import Rental from "../../models/Rental.model";

export default function RentalDisplay(props: { rental: Rental }) {
    return (
        <div className="flex">
            <Link to={`/show/${props.rental.rentalShowID}`}>
                <img className="rounded-3xl border-2 flex border-light-green max-h-[200px]" src={props.rental.rentalShowPoster} alt="" />
            </Link>
            <div className="flex flex-col">
                <span>
                    { props.rental.rentalShowTitle }
                </span>
                { props.rental.rentalStatus === "active" ? (
                    <>
                        <span>
                            { new Date(props.rental.rentalStart || "").toISOString() }
                        </span>
                        <span>
                            { new Date(props.rental.rentalExpiring || "").toISOString() }
                        </span>
                    </>
                ) : (
                    <>
                        <span>
                            { new Date(props.rental.rentalStart || "").toISOString() }
                        </span>
                        <span>
                            { new Date(props.rental.rentalCancelledDate || "").toISOString() }
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}