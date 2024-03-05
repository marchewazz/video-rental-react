import { Link } from "react-router-dom";
import PopUpMessage from "../../models/PopUpMessage.model";
import strings from "../../utilities/strings";

export default function PopUpElement(props: { notification: PopUpMessage}) {

    const successMessages: string[] = ["rented", "rentalCancelled", "moneyAdded", "addedToFavorites", "removedFromFavorites", "invitationSent", "invitationReceived", "profileEdited", "nickTaken", "serverInfo"];
    const errorMessages: string[] = ["errorMessage", "noMoney"];    

    return (
        <div className={`${successMessages.includes(props.notification.message) ? "notification-success" : ""} 
          ${errorMessages.includes(props.notification.message) ? "notification-error" : ""}`
          }>
            { props.notification.message === "invitationReceived" ? (
              <p>
                { strings.formatString(strings.popUpNotifications.invitationReceived, { senderNick: props.notification.senderNick || "" })} {" "}
                <Link className="underline" to={`/user/${props.notification.senderID}`}>
                  { strings.popUpNotifications.viewProfile}
                </Link>
              </p>
            ) : (
              <p>
                { strings.popUpNotifications[props.notification.message as keyof typeof strings.popUpNotifications] || ""}
              </p>
            )}
          </div>
    )
}