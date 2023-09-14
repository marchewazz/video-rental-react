import { useEffect, useRef, useState } from "react"
import strings from "../../utilities/strings"

export default function PopUpContainer(props: any) {

    const [notifications, setNotifications] = useState<any>([])
    const notificationRef = useRef(notifications);
    const [notificationsElements, setNotificationsElements] = useState<any>([])
    const notificationElementsRef = useRef(notificationsElements);

    useEffect(() => {
      if (props.socket) {
        props.socket.on("emitPopUpNotification", (data: any) => {
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

      const successMessages: string[] = ["rented", "rentalCancelled", "moneyAdded"];
      const errorMessages: string[] = ["errorMessage", "noMoney"];

      notifications.forEach((notification: any) => {
        setNotificationsElements([...notificationsElements, (
          <div className={`notification 
          ${successMessages.includes(notification.message) ? "success" : ""} 
          ${errorMessages.includes(notification.message) ? "error" : ""}`
          }>
            <p>
              { strings.popUpNotifications[notification.message as keyof typeof strings.popUpNotifications] || ""}
            </p>
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