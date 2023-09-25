import { useOutletContext } from "react-router-dom";
import Context from "../../models/Context.model";
import strings from "../../utilities/strings";

export default function UserDataDisplay() {

    const { userData } = useOutletContext<Context>();

    return (
        <div>
            <p className="mb-3">
                <span className="profile-data-category">Nick: </span> 
                <span className="profile-data-value">{ userData.userNick }</span>
            </p>
            <p className="mb-3">
                <span className="profile-data-category">Email: </span>
                <span className="profile-data-value">{ userData.userEmail }</span>
            </p>
            <p className="mb-3">
                <span className="profile-data-category">{ strings.profilePage.userCreateDate } </span>
                <span className="profile-data-value">
                    { new Date(userData.userCreateDate).toLocaleString().split(",")[0] }
                </span>
            </p>
        </div>
    )
}