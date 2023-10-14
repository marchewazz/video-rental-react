import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import strings from "../../utilities/strings";

import Context from "../../models/Context.model";
import Friend from "../../models/Friend.model";
import Invitation from "../../models/Invitation.model";
import PopUpMessage from "../../models/PopUpMessage.model";
import generateRandomString from "../../utilities/randomString";

import OtherUserData from "../../models/OtherUserData.model";
import Comparasions from "./Comparasions";

export default function OtherUserDisplay(props: {
  otherUserData: OtherUserData;
}) {
  const [disableSendInvitationButton, setDisableSendInvitationButton] =
    useState<string>("");
  const [disableCancelInvitationButton, setDisableCancelInvitationButton] =
    useState<string>("");
  const [disableAcceptButton, setDisableAcceptButton] = useState<string>("");
  const [disableRejectButton, setDisableRejectButton] = useState<string>("");
  const [disableDeleteFriendButton, setDisableDeleteFriendButton] =
    useState<string>("");

  const disableSendInvitationButtonRef = useRef<string>(
    disableSendInvitationButton
  );
  const disableCancelInvitationButtonRef = useRef<string>(
    disableCancelInvitationButton
  );
  const disableAcceptButtonRef = useRef<string>(disableAcceptButton);
  const disableRejectButtonRef = useRef<string>(disableRejectButton);
  const disableDeleteFriendButtonRef = useRef<string>(
    disableDeleteFriendButton
  );

    const [comparasions, setComparasions] = useState({});

  const { userData, socket } = useOutletContext<Context>();

  function sendInvitation() {
    const eventID = `send-invitation-${generateRandomString(48)}`;
    setDisableSendInvitationButton(eventID);
    socket.emit("sendInvitation", {
      receiverID: props.otherUserData.userID,
      eventID: eventID,
    });
  }

  function acceptInvitation() {
    const eventID = `accept-invitation-${generateRandomString(48)}`;
    setDisableAcceptButton(eventID);
    setDisableRejectButton(eventID);
    socket.emit("acceptInvitation", {
      invitationData: userData.userInvitations.filter(
        (invitation: any) => invitation.receiverID === userData.userID
      )[0],
      eventID: eventID,
    });
  }

  function rejectInvitation() {
    const eventID = `reject-invitation-${generateRandomString(48)}`;
    setDisableAcceptButton(eventID);
    setDisableRejectButton(eventID);
    socket.emit("rejectInvitation", {
      invitationData: userData.userInvitations.filter(
        (invitation: any) => invitation.receiverID === userData.userID
      )[0],
      eventID: eventID,
    });
  }

  function cancelInvitation() {
    const eventID = `cancel-invitation-${generateRandomString(48)}`;
    setDisableCancelInvitationButton(eventID);
    socket.emit("cancelInvitation", {
      invitationData: userData.userInvitations.filter(
        (invitation: any) => invitation.senderID === userData.userID
      )[0],
      eventID: eventID,
    });
  }

  function deleteFriend() {
    const eventID = `delete-friend-${generateRandomString(48)}`;
    setDisableDeleteFriendButton(eventID);
    socket.emit("deleteFriend", {
      friendID: props.otherUserData.userID,
      eventID: eventID,
    });
  }

  useEffect(() => {
    if (userData.userFriends.some((friend: Friend) => friend.friendID === props.otherUserData.userID)) {
      socket.emit("getComparasions", { friendID: props.otherUserData.userID })
    } else {
      setComparasions({})
    }
  }, [userData.userFriends])
  

  useEffect(() => {
    if (socket) {
      socket.on("emitPopUpNotification", (data: PopUpMessage) => {
        if (data.eventID === disableSendInvitationButtonRef.current)
          setDisableSendInvitationButton("");
        if (data.eventID === disableCancelInvitationButtonRef.current)
          setDisableCancelInvitationButton("");
        if (data.eventID === disableAcceptButtonRef.current) {
          setDisableAcceptButton("");
          setDisableRejectButton("");
        }
        if (data.eventID === disableRejectButtonRef.current) {
          setDisableAcceptButton("");
          setDisableRejectButton("");
        }
        if (data.eventID === disableDeleteFriendButtonRef.current)
          setDisableDeleteFriendButton("");
      });
      socket.on("getComparasions", (data: any) => {
        if (data.message === "comparasion") {
          for (const key of ["bothRentedIt", "bothLikeIt", "friendLikeIt", "friendRentedIt"]) {
            for (const index in data[key]) {
              
            }
          }
        } else setComparasions({})
      })
    }
  }, [socket]);

  useEffect(() => {
    disableSendInvitationButtonRef.current = disableSendInvitationButton;
  }, [disableSendInvitationButton]);

  useEffect(() => {
    disableCancelInvitationButtonRef.current = disableCancelInvitationButton;
  }, [disableCancelInvitationButton]);

  useEffect(() => {
    disableAcceptButtonRef.current = disableAcceptButton;
  }, [disableAcceptButton]);

  useEffect(() => {
    disableRejectButtonRef.current = disableRejectButton;
  }, [disableRejectButton]);

  useEffect(() => {
    disableDeleteFriendButtonRef.current = disableDeleteFriendButton;
  }, [disableDeleteFriendButton]);

  return (
    <div className="container py-10">
      <p className="font-semibold text-6xl italic text-dark-green dark:text-light-green mb-10">
        {strings.formatString(strings.otherUserPage.title, {
          nick: props.otherUserData.userNick,
        })}
      </p>
      <p className="mb-3">
        <span className="profile-data-category">
          {strings.profilePage.userCreateDate}{" "}
        </span>
        <span className="profile-data-value">
          {
            new Date(props.otherUserData.userCreateDate)
              .toLocaleString()
              .split(",")[0]
          }
        </span>
      </p>
      <>
        {userData.userFriends.some(
          (friend: Friend) => friend.friendID === props.otherUserData.userID
        ) ? (
          <>
            <p className="mb-3">
              <span className="profile-data-category">
                {strings.otherUserPage.friendsText}{" "}
              </span>
              <span className="profile-data-value">
                {
                  new Date(
                    userData.userFriends.filter(
                      (friend: Friend) =>
                        friend.friendID === props.otherUserData.userID
                    )[0].friendsSinceDate
                  )
                    .toLocaleString()
                    .split(",")[0]
                }
              </span>
            </p>
            <button
                className="bg-light-green border-2 border-dark-green text-white rounded-2xl p-3 flex duration-300 transition-all ease-in-out
                dark:text-earie-black hover:bg-dark-green"
              disabled={disableDeleteFriendButton != ""}
              onClick={deleteFriend}
            >
              {strings.otherUserPage.deleteButton}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 ml-4"
              >
                <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {userData.userInvitations.some(
              (invitation: Invitation) =>
                invitation.senderID === userData.userID
            ) ? (
              <button
                className="cancel-button flex"
                disabled={disableCancelInvitationButton != ""}
                onClick={cancelInvitation}
              >
                {strings.otherUserPage.cancelButton}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 ml-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <>
                {userData.userInvitations.some(
                  (invitation: Invitation) =>
                    invitation.receiverID === userData.userID
                ) ? (
                  <>
                    <p className="mb-3 text-2xl font-bold dark:text-white">
                        {strings.otherUserPage.invitationText}
                    </p>
                    <div className="grid grid-cols-2 gap-9 w-full md:w-1/2 xl:w-1/4">
                      <button
                        className="accept-button flex justify-between"
                        disabled={disableAcceptButton != ""}
                        onClick={acceptInvitation}
                      >
                        {strings.otherUserPage.acceptButton}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        className="cancel-button flex justify-between"
                        disabled={disableRejectButton != ""}
                        onClick={rejectInvitation}
                      >
                        {strings.otherUserPage.rejectButton}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="bg-light-green border-2 border-dark-green text-white rounded-2xl p-3 flex duration-300 transition-all ease-in-out
                    dark:text-earie-black hover:bg-dark-green
                    disabled:bg-gray-400 disabled:border-earie-black dark:disabled:border-white disabled:text-white"
                    disabled={disableSendInvitationButton != ""}
                    onClick={sendInvitation}
                  >
                    {strings.otherUserPage.sendInvitation}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 ml-4"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </>
        )}
      </>
      <Comparasions otherUserData={props.otherUserData} />
    </div>
  );
}
