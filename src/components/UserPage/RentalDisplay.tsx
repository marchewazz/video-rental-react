import { Link } from "react-router-dom";
import Rental from "../../models/Rental.model";
import strings from "../../utilities/strings";

export default function RentalDisplay(props: { rental: Rental }) {
  return (
    <div className="flex flex-col md:flex-row mb-5">
      <Link className="self-center md:self-auto" to={`/show/${props.rental.rentalShowID}`}>
        <div className="rounded-3xl border-2 flex border-light-green w-[170px] h-[250px]">
          <img
            className={`rounded-3xl ${!props.rental.rentalShowPoster|| props.rental.rentalShowPoster == "N/A" ? "justify-self-center self-center" : "w-full h-full" }`}
            src={!props.rental.rentalShowPoster || props.rental.rentalShowPoster == "N/A" ? "images/no-image-icon.png" : props.rental.rentalShowPoster}
            alt=""
          />
        </div>
      </Link>
      <div className="flex flex-col justify-evenly mt-2 md:mt-0 md:ml-5">
        <Link className="font-bold text-dark-green dark:text-light-green text-4xl" to={`/show/${props.rental.rentalShowID}`}>{props.rental.rentalShowTitle}</Link>
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
                {`${new Date(props.rental.rentalExpiring || "").toLocaleDateString()} ${new Date(props.rental.rentalExpiring || "").toLocaleTimeString()}`}
              </span>
            </p>
          </>
        ) : (
          <>
            { props.rental.rentalStatus === "expired" ? (
              <>
                <p>
                  <span className="profile-data-category">
                    {strings.profilePage.rentalExpired}
                  </span>
                  <span className="profile-data-value">
                    {`${new Date(props.rental.rentalExpiredDate || "").toLocaleDateString()} ${new Date(props.rental.rentalExpiredDate || "").toLocaleTimeString()}`}
                  </span>
                </p>
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
