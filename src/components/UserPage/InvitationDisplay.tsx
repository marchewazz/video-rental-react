import { Link, useOutletContext } from "react-router-dom";
import Invitation from "../../models/Invitation.model";
import { useEffect, useRef, useState } from "react";
import generateRandomString from "../../utilities/randomString";
import Context from "../../models/Context.model";

export default function InvitationDisplay(props: { invitation: Invitation }) {
  const [disableAcceptButton, setDisableAcceptButton] = useState<string>("");
  const [disableRejectButton, setDisableRejectButton] = useState<string>("");

  const disableAcceptButtonRef = useRef<string>(disableAcceptButton);
  const disableRejectButtonRef = useRef<string>(disableRejectButton);

  const { socket } = useOutletContext<Context>();

  function acceptInvitation() {
    const eventID = `accept-invitation-${generateRandomString(48)}`;
    setDisableAcceptButton(eventID);
    setDisableRejectButton(eventID);
    socket.emit("acceptInvitation", {
      invitationData: props.invitation,
      eventID: eventID,
    });
  }

  function rejectInvitation() {
    const eventID = `reject-invitation-${generateRandomString(48)}`;
    setDisableAcceptButton(eventID);
    setDisableRejectButton(eventID);
    socket.emit("rejectInvitation", {
      invitationData: props.invitation,
      eventID: eventID,
    });
  }

  useEffect(() => {
    disableAcceptButtonRef.current = disableAcceptButton;
  }, [disableAcceptButton]);

  useEffect(() => {
    disableRejectButtonRef.current = disableRejectButton;
  }, [disableRejectButton]);

  return (
    <div className="flex items-center w-full sm:w-1/2 justify-between mb-4">
      <div className="flex flex-col">
        <Link
          to={`/user/${props.invitation.senderID}`}
          className="underline lg:text-2xl dark:text-white"
        >
          {props.invitation.senderNick}
        </Link>
      </div>
      <div className="flex gap-5">
        <button
          className="bg-green-700 disabled:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-green-900 transition-all duration-200 ease-in-out"
          disabled={disableAcceptButton != ""}
          onClick={acceptInvitation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
        <button
          className="bg-red-700 disabled:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-red-900 transition-all duration-200 ease-in-out"
          disabled={disableRejectButton != ""}
          onClick={rejectInvitation}
        >
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
    </div>
  );
}
