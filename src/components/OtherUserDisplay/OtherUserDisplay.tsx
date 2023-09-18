import { useOutletContext } from "react-router-dom";

export default function OtherUserDisplay(props: any) {

    const { userData, socket } = useOutletContext<any>();

    function sendInvitation() {
        socket.emit("sendInvitation", { receiverID: props.otherUserData.userID })
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
                        { userData.userInvitations.some((invitation: any) => invitation.senderID === userData.userID ) ? (
                            <p>
                                Sent
                            </p>
                        ) : (
                            <>
                                { userData.userInvitations.some((invitation: any) => invitation.receiverID === userData.userID ) ? (
                                    <p>
                                        Received
                                    </p>
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