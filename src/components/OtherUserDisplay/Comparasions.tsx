import { useEffect, useState } from "react";
import OtherUserData from "../../models/OtherUserData.model";
import Friend from "../../models/Friend.model";
import Context from "../../models/Context.model";
import { Link, useOutletContext } from "react-router-dom";
import ShowsService from "../../services/ShowsService.service";
import LoadingComponent from "../LoadingComponent";
import strings from "../../utilities/strings";
import ComparasionSwiper from "./ComparasionSwiper";

export default function Comparasions(props: { otherUserData: OtherUserData }) {

    const [comparasions, setComparasions] = useState({
        bothRentedIt: [],
        bothLikeIt: [],
        friendLikeIt: [],
        friendRentedIt: [],
    });

    const { userData, socket } = useOutletContext<Context>();

    const ss: ShowsService = new ShowsService()

    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        if (userData.userFriends.some((friend: Friend) => friend.friendID === props.otherUserData.userID)) {
          socket.emit("getComparasions", { friendID: props.otherUserData.userID })
        } else {
          setComparasions({
            bothRentedIt: [],
            bothLikeIt: [],
            friendLikeIt: [],
            friendRentedIt: [],
        })
        }
      }, [userData.userFriends])

    useEffect(() => {
        if (socket) {
          socket.on("getComparasions", (data: any) => {
            if (data.message === "comparasion") {
                let tempComparasions: any = {
                    bothRentedIt: [],
                    bothLikeIt: [],
                    friendLikeIt: [],
                    friendRentedIt: [],
                }
              for (const key of ["bothRentedIt", "bothLikeIt", "friendLikeIt", "friendRentedIt"]) {
                Promise.all(data[key].map((showID: string, index: number) => {
                    ss.getShowData(showID).then((res: any) => {
                        let objectData = {
                            showID: showID,
                            Title: res.data.Title,
                            Poster: res.data.Poster
                        }

                        tempComparasions[key].push(objectData)
                        if (!data["friendRentedIt"].length || index === data["friendRentedIt"].length - 1 && key === "friendRentedIt") {
                            setReady(true)
                            setComparasions(tempComparasions)
                        }
                    })
                }))
                }
            } else setComparasions({
                bothRentedIt: [],
                bothLikeIt: [],
                friendLikeIt: [],
                friendRentedIt: [],
            })
          })
        }
      }, [socket]);

    return (
        <div className="mt-10">
            { userData.userFriends.some(
                (friend: Friend) => friend.friendID === props.otherUserData.userID
                ) ? (
                  <>
                    { ready ? (
                        <>
                            { comparasions.friendRentedIt.length ? (
                                <div>
                                    <p className="text-4xl lg:text-6xl text-center font-extrabold text-dark-green dark:text-light-green italic my-5">
                                        { strings.otherUserPage.comparasions.friendRentedIt }
                                    </p>
                                    <div>
                                        <ComparasionSwiper shows={comparasions.friendRentedIt} />
                                    </div>
                                </div>
                            ) : (null)}
                            { comparasions.friendLikeIt.length ? (
                                <div>
                                    <p className="text-4xl lg:text-6xl text-center font-extrabold text-dark-green dark:text-light-green italic my-5">
                                        { strings.otherUserPage.comparasions.friendLikeIt }
                                    </p>
                                    <div>
                                        <ComparasionSwiper shows={comparasions.friendLikeIt} />
                                    </div>
                                </div>
                            ) : (null)}
                            { comparasions.bothRentedIt.length ? (
                                <div>
                                    <p className="text-4xl lg:text-6xl text-center font-extrabold text-dark-green dark:text-light-green italic my-5">
                                        { strings.otherUserPage.comparasions.bothRentedIt }
                                    </p>
                                    <div>
                                        <ComparasionSwiper shows={comparasions.bothRentedIt} />
                                    </div>
                                </div>
                            ) : (null)}
                            { comparasions.bothLikeIt.length ? (
                                <div>
                                    <p className="text-4xl lg:text-6xl text-center font-extrabold text-dark-green dark:text-light-green italic my-5">
                                        { strings.otherUserPage.comparasions.bothLikeIt }
                                    </p>
                                    <div>
                                        <ComparasionSwiper shows={comparasions.bothLikeIt} />
                                    </div>
                                </div>
                            ) : (null)}
                        </>
                    ) : (
                        <LoadingComponent />
                    )}
                </>
                ) : (
                  <p className="text-4xl lg:text-6xl text-center font-extrabold text-dark-green dark:text-light-green italic my-5">
                    { strings.otherUserPage.comparasions.noFriends }
                  </p>
            )}
        </div>
        
    )
}