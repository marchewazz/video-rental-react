import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import strings from "../../utilities/strings";

import Context from "../../models/Context.model";
import Friend from "../../models/Friend.model";
import Invitation from "../../models/Invitation.model";
import PopUpMessage from "../../models/PopUpMessage.model";
import generateRandomString from "../../utilities/randomString";

export default function OtherUserDisplay(props: any) {

    const [disableSendInvitationButton, setDisableSendInvitationButton] = useState<string>("")
    const [disableCancelInvitationButton, setDisableCancelInvitationButton] = useState<string>("")
    const [disableAcceptButton, setDisableAcceptButton] = useState<string>("")
    const [disableRejectButton, setDisableRejectButton] = useState<string>("")
    const [disableDeleteFriendButton, setDisableDeleteFriendButton] = useState<string>("")

    const disableSendInvitationButtonRef = useRef<string>(disableSendInvitationButton);
    const disableCancelInvitationButtonRef = useRef<string>(disableCancelInvitationButton);
    const disableAcceptButtonRef = useRef<string>(disableAcceptButton);
    const disableRejectButtonRef = useRef<string>(disableRejectButton);
    const disableDeleteFriendButtonRef = useRef<string>(disableDeleteFriendButton);

    const { userData, socket } = useOutletContext<Context>();

    function sendInvitation() {
        const eventID = `send-invitation-${generateRandomString(48)}`
        setDisableSendInvitationButton(eventID)
        socket.emit("sendInvitation", { receiverID: props.otherUserData.userID, eventID: eventID })
    }

    function acceptInvitation() {
        const eventID = `accept-invitation-${generateRandomString(48)}`
        setDisableAcceptButton(eventID)
        setDisableRejectButton(eventID)
        socket.emit("acceptInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.receiverID === userData.userID)[0], eventID: eventID })
    }

    function rejectInvitation() {
        const eventID = `reject-invitation-${generateRandomString(48)}`
        setDisableAcceptButton(eventID)
        setDisableRejectButton(eventID)
        socket.emit("rejectInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.receiverID === userData.userID)[0], eventID: eventID })
    }

    function cancelInvitation() {
        const eventID = `cancel-invitation-${generateRandomString(48)}`
        setDisableCancelInvitationButton(eventID)
        socket.emit("cancelInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.senderID === userData.userID)[0], eventID: eventID })
    }

    function deleteFriend() {
        const eventID = `delete-friend-${generateRandomString(48)}`
        setDisableDeleteFriendButton(eventID)
        socket.emit("deleteFriend", { friendID: props.otherUserData.userID, eventID: eventID })
    }

    useEffect(() => {
        if (socket) {
          socket.on("emitPopUpNotification", (data: PopUpMessage) => {
            if (data.eventID === disableSendInvitationButtonRef.current) setDisableSendInvitationButton("")
            if (data.eventID === disableCancelInvitationButtonRef.current) setDisableCancelInvitationButton("")
            if (data.eventID === disableAcceptButtonRef.current) {
                setDisableAcceptButton("")
                setDisableRejectButton("")
            }
            if (data.eventID === disableRejectButtonRef.current) {
                setDisableAcceptButton("")
                setDisableRejectButton("")
            }
            if (data.eventID === disableDeleteFriendButtonRef.current) setDisableDeleteFriendButton("")
          })
        }
    }, [socket])

    useEffect(() => {
      disableSendInvitationButtonRef.current = disableSendInvitationButton
    }, [disableSendInvitationButton])

    useEffect(() => {
      disableCancelInvitationButtonRef.current = disableCancelInvitationButton
    }, [disableCancelInvitationButton])

    useEffect(() => {
      disableAcceptButtonRef.current = disableAcceptButton
    }, [disableAcceptButton])

    useEffect(() => {
      disableRejectButtonRef.current = disableRejectButton
    }, [disableRejectButton])

    useEffect(() => {
      disableDeleteFriendButtonRef.current = disableDeleteFriendButton
    }, [disableDeleteFriendButton])

    return (
        <div>
            { props.otherUserData.userNick }
            <>
                { userData.userFriends.some((friend: Friend) => friend.friendID === props.otherUserData.userID) ? (
                    <>
                        <p>
                            { strings.formatString(strings.otherUserPage.friendsText, { date: new Date(userData.userFriends.filter((friend: Friend) => friend.friendID === props.otherUserData.userID)[0].friendsSinceDate).toUTCString() }) }
                        </p>
                        <button disabled={disableDeleteFriendButton != ""} onClick={deleteFriend}>
                            { strings.otherUserPage.deleteButton }
                        </button>
                    </>
                   
                ) : (
                    <>
                        { userData.userInvitations.some((invitation: Invitation) => invitation.senderID === userData.userID) ? (
                            <button disabled={disableCancelInvitationButton != ""} onClick={cancelInvitation}>
                                { strings.otherUserPage.cancelButton }
                            </button>
                        ) : (
                            <>
                                { userData.userInvitations.some((invitation: Invitation) => invitation.receiverID === userData.userID) ? (
                                    <>
                                        <p>
                                            { strings.otherUserPage.invitationText }
                                        </p>
                                        <button disabled={disableAcceptButton != ""} onClick={acceptInvitation}>
                                            { strings.otherUserPage.acceptButton }
                                        </button>
                                        <button disabled={disableRejectButton != ""} onClick={rejectInvitation}>
                                            { strings.otherUserPage.rejectButton }
                                        </button>
                                    </>
                                    
                                ) : (
                                    <button disabled={disableSendInvitationButton != ""} onClick={sendInvitation}>
                                        { strings.otherUserPage.sendInvitation }
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </>
        </div>
    )
}