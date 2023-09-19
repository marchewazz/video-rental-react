import { useOutletContext } from "react-router-dom";
import strings from "../../utilities/strings";

import Context from "../../models/Context.model";
import Friend from "../../models/Friend.model";
import Invitation from "../../models/Invitation.model";

export default function OtherUserDisplay(props: any) {

    const { userData, socket } = useOutletContext<Context>();

    function sendInvitation() {
        socket.emit("sendInvitation", { receiverID: props.otherUserData.userID })
    }

    function acceptInvitation() {
        socket.emit("acceptInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.receiverID === userData.userID)[0] })
    }

    function rejectInvitation() {
        socket.emit("rejectInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.receiverID === userData.userID)[0] })
    }

    function cancelInvitation() {
        socket.emit("cancelInvitation", { invitationData: userData.userInvitations.filter((invitation: any) => invitation.senderID === userData.userID)[0] })
    }

    function deleteFriend() {
        socket.emit("deleteFriend", { friendID: props.otherUserData.userID })
    }

    return (
        <div>
            { props.otherUserData.userNick }
            <>
                { userData.userFriends.some((friend: Friend) => friend.friendID === props.otherUserData.userID) ? (
                    <>
                        <p>
                            { strings.formatString(strings.otherUserPage.friendsText, { date: new Date(userData.userFriends.filter((friend: Friend) => friend.friendID === props.otherUserData.userID)[0].friendsSinceDate).toUTCString() }) }
                        </p>
                        <button onClick={deleteFriend}>
                            { strings.otherUserPage.deleteButton }
                        </button>
                    </>
                   
                ) : (
                    <>
                        { userData.userInvitations.some((invitation: Invitation) => invitation.senderID === userData.userID) ? (
                            <button onClick={cancelInvitation}>
                                { strings.otherUserPage.cancelButton }
                            </button>
                        ) : (
                            <>
                                { userData.userInvitations.some((invitation: Invitation) => invitation.receiverID === userData.userID) ? (
                                    <>
                                        <p>
                                            { strings.otherUserPage.invitationText }
                                        </p>
                                        <button onClick={acceptInvitation}>
                                            { strings.otherUserPage.acceptButton }
                                        </button>
                                        <button onClick={rejectInvitation}>
                                            { strings.otherUserPage.rejectButton }
                                        </button>
                                    </>
                                    
                                ) : (
                                    <button onClick={sendInvitation}>
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