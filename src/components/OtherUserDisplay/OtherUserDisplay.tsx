import { useOutletContext } from "react-router-dom";

export default function OtherUserDisplay(props: any) {

    const { userData, socket } = useOutletContext<any>();

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

    return (
        <div>
            { props.otherUserData.userNick }
            <>
                { userData.userFriends.some((friend: any) => friend.friendID === props.otherUserData.userID) ? (
                    <p>
                        You are friends
                    </p>
                ) : (
                    <>
                        { userData.userInvitations.some((invitation: any) => invitation.senderID === userData.userID) ? (
                            <button onClick={cancelInvitation}>
                                Cancel invitation 
                            </button>
                        ) : (
                            <>
                                { userData.userInvitations.some((invitation: any) => invitation.receiverID === userData.userID) ? (
                                    <>
                                        <p>
                                            Invitation
                                        </p>
                                        <button onClick={acceptInvitation}>
                                            Accept 
                                        </button>
                                        <button onClick={rejectInvitation}>
                                            Reject
                                        </button>
                                    </>
                                    
                                ) : (
                                    <button onClick={sendInvitation}>
                                        Send invitation
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