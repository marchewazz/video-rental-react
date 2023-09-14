import strings from "../utilities/strings";

export default function NavBar(props: any) {

    return (
        <nav>
            <ul>
                <li>
                    { props.isUserLogged ? (
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