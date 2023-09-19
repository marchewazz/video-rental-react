import UserData from "../models/UserData.model";
import strings from "../utilities/strings";

export default function NavBar(props: { userData: UserData | undefined, isUserLogged: boolean, logoutFunction: React.MouseEventHandler<HTMLButtonElement> }) {

    return (
        <nav>
            <ul>
                <li>
                    { props.isUserLogged && props.userData ? (
                        <>
                            <p>
                            { props.userData.userNick }
                            </p>
                            <a href="/add-money">{ strings.nav.addMoney }</a>
                            <button onClick={props.logoutFunction}>
                                WYLOGUJ
                            </button>
                        </>
                        
                    ) : (
                        <>
                            <a href="/login">{ strings.nav.login }</a>
                            <a href="/register">{ strings.nav.register }</a>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    )
}