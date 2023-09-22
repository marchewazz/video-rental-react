import { useEffect, useRef, useState } from "react"
import strings from "../../utilities/strings"
import PopUpMessage from "../../models/PopUpMessage.model";
import { Link } from "react-router-dom";

export default function PopUpContainer(props: any) {

    const [notifications, setNotifications] = useState<PopUpMessage[]>([])
    const notificationRef = useRef<PopUpMessage[]>(notifications);
    const [notificationsElements, setNotificationsElements] = useState<React.JSX.Element[]>([])
    const notificationElementsRef = useRef<React.JSX.Element[]>(notificationsElements);

    useEffect(() => {
      if (props.socket) {
        props.socket.on("emitPopUpNotification", (data: PopUpMessage) => {
          setNotifications([...notifications, data])  
          const timeout = setTimeout(() => {
            setNotifications(notificationRef.current.slice(1))
            setNotificationsElements(notificationElementsRef.current.slice(1))
          }, 3000);
          return () => {
            clearTimeout(timeout);
          };
        })
      }
    }, [props.socket])
    

    useEffect(() => {
      notificationRef.current = notifications;
      
      const successMessages: string[] = ["rented", "rentalCancelled", "moneyAdded", "addedToFavorites", "removedFromFavorites", "invitationSent", "invitationReceived"];
      const errorMessages: string[] = ["errorMessage", "noMoney"];

      notifications.forEach((notification: PopUpMessage) => {
        setNotificationsElements([...notificationsElements, (
          <div className={`notification 
          ${successMessages.includes(notification.message) ? "success" : ""} 
          ${errorMessages.includes(notification.message) ? "error" : ""}`
          }>
            { notification.message === "invitationReceived" ? (
              <p>
                { strings.formatString(strings.popUpNotifications.invitationReceived, { senderNick: notification.senderNick })}
                <Link to={`/user/${notification.senderID}`}>
                  { strings.popUpNotifications.viewProfile}
                </Link>
              </p>
            ) : (
              <p>
                { strings.popUpNotifications[notification.message as keyof typeof strings.popUpNotifications] || ""}
              </p>
            )}
            
          </div>
        )])
      });
    }, [notifications])

    useEffect(() => {
      notificationElementsRef.current = notificationsElements;
    }, [notificationsElements])
    
    
    return (
        <div className="pop-up-container">
            { notificationsElements }
        </div>
    )
}