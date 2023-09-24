import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import Friend from "../../models/Friend.model";
import UsersService from "../../services/UsersService.service";
import strings from "../../utilities/strings";
import FriendDisplay from "./FriendDisplay";

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
  }, [userData, userDataReady]);

  return (
    <div>
      {ready ? (
        <>
            {friendsList?.length ? (
                <div>
                    { friendsList.map((friend: Friend, index: number) => {
                        return <FriendDisplay friend={friend} key={index} />
                    })}
                </div>
            ) : (
                <p>No friends</p>
            )}
            </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
