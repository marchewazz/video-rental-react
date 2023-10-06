import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import Friend from "../../models/Friend.model";
import UsersService from "../../services/UsersService.service";
import strings from "../../utilities/strings";
import FriendDisplay from "./FriendDisplay";
import LoadingComponent from "../LoadingComponent";

export default function UserFriends() {
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  const { userData, userDataReady } = useOutletContext<Context>();

  const us: UsersService = new UsersService();

  useEffect(() => {
    if (userDataReady) {
      const friendsList = userData.userFriends;
      setReady(false)
      setFriendsList([])

      if (friendsList.length) {
        friendsList.forEach((friend: Friend, index: number) => {
          us.getUserDataByID(friend.friendID).then((res: any) => {
            if (res.data.message === "userData") {
              friendsList[index] = {
                friendID: friend.friendID,
                friendNick: res.data.userData.userNick,
                friendsSinceDate: friend.friendsSinceDate,
              };
            } else {
              friendsList.splice(index, 1);
            }
            if (index === friendsList.length - 1) {
              setReady(true);
              setFriendsList(friendsList);
            }
          });
        });
      } else {
        setReady(true);
      }
    }
  }, [userData.userFriends, userDataReady]);

  return (
    <div className="flex flex-col items-center">
      {ready ? (
        <>
            {friendsList?.length ? (
                <>
                    { friendsList.map((friend: Friend, index: number) => {
                        return <FriendDisplay friend={friend} key={index} />
                    })}
                </>
            ) : (
              <p className="text-center text-3xl lg:text-5xl text-gray-600 dark:text-white">
                { strings.profilePage.noFriends }
              </p>
            )}
            </>
      ) : (
        <div className="flex items-center justify-center">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
}
