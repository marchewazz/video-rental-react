import { useEffect, useState } from "react";
import Invitation from "../../models/Invitation.model";
import Context from "../../models/Context.model";
import { useOutletContext } from "react-router-dom";
import UsersService from "../../services/UsersService.service";
import InvitationDisplay from "./InvitationDisplay";
import strings from "../../utilities/strings";
import LoadingComponent from "../LoadingComponent";

export default function UserInvitaions() {
    
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  const { userData, userDataReady } = useOutletContext<Context>();

  const us: UsersService = new UsersService();

  useEffect(() => {
    if (userDataReady) {
      const invitations = userData.userInvitations.filter((invitation: Invitation) => invitation.receiverID === userData.userID);
      setReady(false);
      setInvitations([]);

      if (invitations.length) {
        invitations.forEach((invitation: Invitation, index: number) => {
          us.getUserDataByID(invitation.senderID).then((res: any) => {
            if (res.data.message === "userData") {
              invitations[index] = Object.assign(invitation, { senderNick: res.data.userData.userNick });
            } else {
              invitations.splice(index, 1);
            }
            if (index === invitations.length - 1) {
              setReady(true);
              setInvitations(invitations);
            }
          });
        });
      } else {
        setReady(true);
      }
    }
  }, [userData.userInvitations, userDataReady]);

  return (
    <div className="flex flex-col items-center">
      {ready ? (
        <>
            {invitations?.length ? (
                <>
                    { invitations.map((invitation: Invitation, index: number) => {
                        return <InvitationDisplay invitation={invitation} key={index} />
                    })}
                </>
            ) : (
                <p className="text-center text-3xl lg:text-5xl text-gray-600 dark:text-white">
                  { strings.profilePage.noInvitations }
                </p>
            )}
            </>
      ) : (
        <div className="flex items-center justify-center">
          <LoadingComponent />
        </div>
      )}
    </div>
)
}
