import { useOutletContext } from "react-router-dom";
import strings from "../../utilities/strings";
import { useEffect, useRef, useState } from "react";

import Rental from "../../models/Rental.model";
import Context from "../../models/Context.model";
import generateRandomString from "../../utilities/randomString";
import PopUpMessage from "../../models/PopUpMessage.model";
import CountdownTimer from "./CountdownTimer";


export default function ShowDisplay(props: any) {
  const { userData, socket } = useOutletContext<Context>();

  const [disableAddToFavoritesButton, setDisableAddToFavoritesButton] =
    useState<string>("");

  const [
    disableRemoveFromFavoritesButton,
    setDisableRemoveFromFavoritesButton,
  ] = useState<string>("");

  const [disableRentButton, setDisableRentButton] = useState<string>("");
  const [disableCancelRentButton, setDisableCancelRentButton] =
    useState<string>("");

  const disableAddToFavoritesButtonRef = useRef<string>(
    disableAddToFavoritesButton
  );

  const disableRemoveFromFavoritesButtonRef = useRef<string>(
    disableRemoveFromFavoritesButton
  );
  
  const disableRentButtonRef = useRef<string>(disableCancelRentButton);
  const disableCancelRentButtonRef = useRef<string>(disableCancelRentButton);

  const price: number = 5.5;

  function rentShow() {
    const eventID = `rent-${generateRandomString(48)}`;
    setDisableRentButton(eventID);
    socket.emit("rentShow", {
      showID: props.showData.imdbID,
      rentPrice: price,
      eventID: eventID,
    });
  }

  function cancelRent() {
    const eventID = `cancel-rent-${generateRandomString(48)}`;
    setDisableCancelRentButton(eventID);
    socket.emit("cancelRent", {
      rentalID: userData.userRentals.filter(
        (rental: Rental) =>
          rental["rentalShowID"] === props.showData.imdbID &&
          rental["rentalStatus"] === "active"
      )[0].rentalID,
      eventID: eventID,
    });
  }

  function addToFavorites() {
    const eventID = `add-to-favorites-${generateRandomString(48)}`;
    setDisableAddToFavoritesButton(eventID);
    socket.emit("addToFavorites", {
      showID: props.showData.imdbID,
      eventID: eventID,
    });
  }

  function removeFromFavorites() {
    const eventID = `remove-from-favorites-${generateRandomString(48)}`;
    setDisableRemoveFromFavoritesButton(eventID);
    socket.emit("removeFromFavorites", {
      showID: props.showData.imdbID,
      eventID: eventID,
    });
  }

  useEffect(() => {
    if (socket) {
      socket.on("emitPopUpNotification", (data: PopUpMessage) => {
        if (data.eventID === disableAddToFavoritesButtonRef.current)
          setDisableAddToFavoritesButton("");
        if (data.eventID === disableRemoveFromFavoritesButtonRef.current)
          setDisableRemoveFromFavoritesButton("");
        if (data.eventID === disableRentButtonRef.current)
          setDisableRentButton("");
        if (data.eventID === disableCancelRentButtonRef.current)
          setDisableCancelRentButton("");
      });
    }
  }, [socket]);

  useEffect(() => {
    disableAddToFavoritesButtonRef.current = disableAddToFavoritesButton;
  }, [disableAddToFavoritesButton]);

  useEffect(() => {
    disableRemoveFromFavoritesButtonRef.current =
      disableRemoveFromFavoritesButton;
  }, [disableRemoveFromFavoritesButton]);

  useEffect(() => {
    disableRentButtonRef.current = disableRentButton;
  }, [disableRentButton]);

  useEffect(() => {
    disableCancelRentButtonRef.current = disableCancelRentButton;
  }, [disableCancelRentButton]);

  return (
    <div className="flex flex-wrap">
      <div className="rounded-3xl border-2 border-light-green flex ml-auto mr-auto lg:ml-0 lg:w-[300px]">
          <img
            className={`rounded-3xl ${!props.showData.Poster || props.showData.Poster == "N/A" ? "justify-self-center self-center" : "w-full" } lg:h-[495px]`}
            src={!props.showData.Poster || props.showData.Poster == "N/A" ? "../images/no-image-icon.png" : props.showData.Poster}
            alt=""
          />
      </div>
      <div className="p-4 flex flex-col w-full lg:w-3/5">
      {userData.userLists[0].listShows.some(
          (item: any) => item.showID === props.showData.imdbID
        ) ? (
          <button
            className="group self-end"
            disabled={disableRemoveFromFavoritesButton != ""}
            onClick={removeFromFavorites}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 fill-[#D9D904] group-hover:group-enabled:scale-150 group-hover:group-enabled:fill-[#ABAB00] group-disabled:fill-gray-200 transition-all duration-100"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button
            className="group self-end"
            disabled={disableAddToFavoritesButton != ""}
            onClick={addToFavorites}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-gray-400 
              group-hover:group-enabled:scale-150 group-hover:group-enabled:stroke-gray-400 group-hover:group-enabled:fill-gray-400 group-disabled:fill-gray-200 group-disabled:stroke-gray-200 
              transition-all duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        )}
        <h5 className="text-sm text-gray-400">
          {
            <>
              { props.showData.Type === "series" ? (
                strings.showPage.series
              ) : (
                strings.showPage.movie
              )}
            </>
          }
        </h5>
        <h3 className="font-bold text-4xl text-teal">{props.showData.Title}</h3>
        { props.showData.Released && props.showData.Released != "N/A" ? (
          <p>
          <span className="show-stat-category">
            {strings.showPage.releaseDate}
          </span>
          <span className="show-stat-value">
            {new Date(props.showData.Released).toLocaleString().split(",")[0]}
          </span>
        </p>
        ) : (null)}
        {props.showData.Type === "series" ? (
          <>
            { props.showData.totalSeasons && props.showData.totalSeasons != "N/A" ? (
              <p>
              <span className="show-stat-category">
                {strings.showPage.totalSeasons}
              </span>
              <span className="show-stat-value">
                {props.showData.totalSeasons}
              </span>
            </p>
            ) : (null)}
          </>
        ) : (
          <>
            { props.showData.Runtime && props.showData.Runtime != "N/A" ? (
                <p>
                <span className="show-stat-category">
                  {strings.showPage.runTime}
                </span>
                <span className="show-stat-value">{props.showData.Runtime}</span>
              </p>
            ) : (null)}
          </>
        )}
        {props.showData.imdbRating && props.showData.imdbVotes && props.showData.imdbRating != "N/A" && props.showData.imdbVotes != "N/A" ? (
          <p>
            <span className="show-stat-category">
              {strings.showPage.ratingCategory}
            </span>
            <span className="show-stat-value">
              {strings.formatString(strings.showPage.ratingValue, {
                rating: props.showData.imdbRating,
                votes: props.showData.imdbVotes,
              })}
            </span>
          </p>
        ) : null}
        {
          <>
            {userData.userRentals.some(
              (rental: any) =>
                rental["rentalShowID"] === props.showData.imdbID &&
                rental["rentalStatus"] === "active"
            ) ? (
              <div className="mt-8 flex flex-col mt-auto">
                <header className="text-center text-2xl dark:text-white mb-3">
                  { strings.showPage.countdownTimer.title }
                </header>
                <CountdownTimer date={userData.userRentals.filter(
                (rental: any) =>
                rental["rentalShowID"] === props.showData.imdbID &&
                rental["rentalStatus"] === "active")[0].rentalExpiring} />
                <button
                    className="cancel-button w-3/4 self-center justify-self-center mt-5"
                  disabled={disableCancelRentButton != ""}
                  onClick={cancelRent}
                >
                  {strings.showPage.cancelButtonText}
                </button>
              </div>
            ) : userData.userBalance > price ? (
              <button
                className="accept-button w-3/4 self-center mt-5 lg:mt-auto"
                disabled={disableRentButton != ""}
                onClick={rentShow}
              >
                {strings.formatString(strings.showPage.rentButton, {
                  price: price.toString(),
                  title: props.showData.Title,
                })}
              </button>
            ) : (
              <p className="mt-5 md:mt-auto text-red-700 text-lg text-center md:text-left">
                {strings.formatString(strings.showPage.notEnoughMoney, {
                  price: price.toString(),
                })}
              </p>
            )}
          </>
        }
      </div>
      <div className="lg:w-full p-4 flex flex-col justify-between">
        <p className="h-full text-xl dark:text-white font-light leading-9">
            { strings.getLanguage() != "en" ? (
                <>
                    { props.showData.PlotTranslated && props.showData.PlotTranslated ? (
                      <>
                          { props.showData.PlotTranslated }
                        <span className="block text-gray-400 text-right text-base">
                            { strings.util.translationInfo }
                        </span>
                      </>
                    ) : (
                      <>
                        { props.showData.Plot }
                        <span className="block text-gray-400 text-base">
                          { strings.showPage.couldntGetPlotTranslated }
                        </span>
                      </>
                    )}
                </>
            ) : (
              <>
                { props.showData.Plot && props.showData.Plot != "N/A" ? (
                  props.showData.Plot
                ):(null)}
              </>
            )}
        </p>
      </div>
    </div>
  );
}
