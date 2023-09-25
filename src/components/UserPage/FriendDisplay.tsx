import { Link, useOutletContext } from "react-router-dom";
import Friend from "../../models/Friend.model";
import strings from "../../utilities/strings";
import PopUpMessage from "../../models/PopUpMessage.model";
import { useEffect, useRef, useState } from "react";
import generateRandomString from "../../utilities/randomString";
import Context from "../../models/Context.model";

export default function FriendDisplay(props: { friend: Friend }) {
  const [disableDeleteFriendButton, setDisableDeleteFriendButton] = useState<string>("");
  const disableDeleteFriendButtonRef = useRef<string>(
    disableDeleteFriendButton
  );

  const { socket } = useOutletContext<Context>();

  function deleteFriend() {
    const eventID = `delete-friend-${generateRandomString(48)}`;
    setDisableDeleteFriendButton(eventID);
    socket.emit("deleteFriend", {
      friendID: props.friend.friendID,
      eventID: eventID,
    });
  }

  useEffect(() => {
    if (socket) {
      socket.on("emitPopUpNotification", (data: PopUpMessage) => {
        if (data.eventID === disableDeleteFriendButtonRef.current)
          setDisableDeleteFriendButton("");
      });
    }
  }, [socket]);

  useEffect(() => {
    disableDeleteFriendButtonRef.current = disableDeleteFriendButton;
  }, [disableDeleteFriendButton]);

  return (
    <div className="flex items-center w-4/5 lg:w-1/2 justify-between mb-5">
      <div className="flex flex-col">
        <Link to={`/user/${props.friend.friendID}`} className="underline text-xl dark:text-white">
          {props.friend.friendNick}
        </Link>
          <span className="text-gray-600 md:text-xl lg:hidden dark:text-white">
          {strings.formatString(strings.profilePage.friendsText, {
            date: new Date(props.friend.friendsSinceDate)
              .toLocaleString()
              .split(",")[0],
          })}
          </span>
      </div>
      <span className="text-gray-600 md:text-xl hidden lg:block dark:text-white">
        {strings.formatString(strings.profilePage.friendsText, {
          date: new Date(props.friend.friendsSinceDate)
            .toLocaleString()
            .split(",")[0],
        })}
      </span>
      <button className="bg-red-700 disabled:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-red-900 transition-all duration-200 ease-in-out" disabled={disableDeleteFriendButton != ""} onClick={deleteFriend}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
