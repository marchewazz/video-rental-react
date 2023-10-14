import React, { useEffect, useState } from "react"
import UserLists from "./UserLists"
import UserFriends from "./UserFriends"
import UserInvitaions from "./UserInvitations"
import UserRentals from "./UserRentals"
import strings from "../../utilities/strings"
import Context from "../../models/Context.model"
import { useOutletContext } from "react-router-dom"

export default function UserDataLists() {

    const [selectedTab, setSelectedTab] = useState<string>("lists")
    const [selectedTabElement, setSelectedTabElement] = useState<any>(<UserLists />)

    const { userData } = useOutletContext<Context>();

    useEffect(() => {
      if (selectedTab === "lists") setSelectedTabElement(<UserLists />)
      if (selectedTab === "friends") setSelectedTabElement(<UserFriends />)
      if (selectedTab === "invitations") setSelectedTabElement(<UserInvitaions />)
      if (selectedTab === "rentals") setSelectedTabElement(<UserRentals />)
    }, [selectedTab])
    

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 my-5">
                <div>
                    <input className="peer hidden" type="radio" name="userDataLists" id="lists" checked={selectedTab === "lists"} onChange={() => setSelectedTab("lists")} />
                        <label className="profile-tab-button rounded-tl-full md:rounded-l-full" htmlFor="lists">
                        { strings.profilePage.nav.lists }
                    </label>
                </div>
                <div>
                    <input className="peer hidden" type="radio" name="userDataLists" id="friends" checked={selectedTab === "friends"} onChange={() => setSelectedTab("friends")} />
                    <label className="profile-tab-button rounded-tr-full md:rounded-none" htmlFor="friends">
                        { strings.profilePage.nav.friends }
                    </label>
                </div>
                <div>
                    <input className="peer hidden" type="radio" name="userDataLists" id="invitations" checked={selectedTab === "invitations"} onChange={() => setSelectedTab("invitations")} />
                    <label className="profile-tab-button rounded-bl-full md:rounded-none relative" htmlFor="invitations">
                        { userData.userInvitations.length ? (
                            <span className="absolute flex h-5 w-5 -top-2 right-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                            </span>
                        ) : (null)}
                        { strings.profilePage.nav.invitations }
                    </label>
                </div>
                <div>
                    <input className="peer hidden" type="radio" name="userDataLists" id="rentals" checked={selectedTab === "rentals"} onChange={() => setSelectedTab("rentals")} />
                    <label className="profile-tab-button rounded-br-full md:rounded-r-full" htmlFor="rentals">
                        { strings.profilePage.nav.rentals }
                    </label>
                </div>
            </div>
            <div>
                { selectedTabElement }
            </div>
        </div>
    )
}