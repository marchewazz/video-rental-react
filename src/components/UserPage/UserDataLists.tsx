import React, { useEffect, useState } from "react"
import UserLists from "./UserLists"
import UserFriends from "./UserFriends"
import UserInvitaions from "./UserInvitations"
import UserRentals from "./UserRentals"

export default function UserDataLists() {

    const [selectedTab, setSelectedTab] = useState<string>("lists")
    const [selectedTabElement, setSelectedTabElement] = useState<any>(<UserLists />)

    useEffect(() => {
      if (selectedTab === "lists") setSelectedTabElement(<UserLists />)
      if (selectedTab === "friends") setSelectedTabElement(<UserFriends />)
      if (selectedTab === "invitations") setSelectedTabElement(<UserInvitaions />)
      if (selectedTab === "rentals") setSelectedTabElement(<UserRentals />)
    }, [selectedTab])
    

    return (
        <div>
            <div>
                <div>
                    <label htmlFor="lists">
                        Listy
                    </label>
                    <input type="radio" name="userDataLists" id="lists" checked={selectedTab === "lists"} onChange={() => setSelectedTab("lists")} />
                </div>
                <div>
                    <label htmlFor="friends">
                        friends
                    </label>
                    <input type="radio" name="userDataLists" id="friends" checked={selectedTab === "friends"} onChange={() => setSelectedTab("friends")} />
                </div>
                <div>
                    <label htmlFor="invitations">
                        invitations
                    </label>
                    <input type="radio" name="userDataLists" id="invitations" checked={selectedTab === "invitations"} onChange={() => setSelectedTab("invitations")} />
                </div>
                <div>
                    <label htmlFor="rentals">
                        rentals
                    </label>
                    <input type="radio" name="userDataLists" id="rentals" checked={selectedTab === "rentals"} onChange={() => setSelectedTab("rentals")} />
                </div>
            </div>
            <div>
                { selectedTabElement }
            </div>
        </div>
    )
}