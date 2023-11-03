import { useEffect, useRef, useState } from "react"
import strings from "../../utilities/strings"
import PopUpMessage from "../../models/PopUpMessage.model";
import { Link } from "react-router-dom";
import PopUpElement from "./PopUpElement";

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
          }, 5000);
          return () => {
            clearTimeout(timeout);
          };
        })
      }
    }, [props.socket])
    

    useEffect(() => {
      notificationRef.current = notifications;
      
      notifications.forEach((notification: PopUpMessage) => {
        setNotificationsElements([...notificationsElements, (
          <PopUpElement notification={notification} />
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