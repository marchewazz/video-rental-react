import { Link } from "react-router-dom";
import Rental from "../../models/Rental.model";
import strings from "../../utilities/strings";

export default function RentalDisplay(props: { rental: Rental }) {
  return (
    <div className="flex mb-5">
      <Link to={`/show/${props.rental.rentalShowID}`}>
        <img
          className="rounded-3xl border-2 flex border-light-green max-h-[250px]"
          src={props.rental.rentalShowPoster}
          alt=""
        />
      </Link>
      <div className="flex flex-col justify-evenly ml-5">
        <p className="font-bold text-dark-green dark:text-light-green text-4xl">{props.rental.rentalShowTitle}</p>
        {props.rental.rentalStatus === "active" ? (
          <>
            <p>
              <span className="profile-data-category">
                {strings.profilePage.rentalStarted}
              </span>
              <span className="profile-data-value">
                {`${new Date(props.rental.rentalStart || "").toLocaleDateString()} ${new Date(props.rental.rentalStart || "").toLocaleTimeString()}`}
              </span>
            </p>
            <p>
              <span className="profile-data-category">
                {strings.profilePage.rentalEnding}
              </span>
              <span className="profile-data-value">
                {`${new Date(props.rental.rentalStart || "").toLocaleDateString()} ${new Date(props.rental.rentalStart || "").toLocaleTimeString()}`}
              </span>
            </p>
          </>
        ) : (
          <>
            { props.rental.rentalStatus === "expired" ? (
              <>

              </>
            ) : (
              <>
                <p>
                  <span className="profile-data-category">
                    {strings.profilePage.rentalCancelled}
                  </span>
                  <span className="profile-data-value">
                    {`${new Date(props.rental.rentalCancelledDate || "").toLocaleDateString()} ${new Date(props.rental.rentalCancelledDate || "").toLocaleTimeString()}`}
                  </span>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
