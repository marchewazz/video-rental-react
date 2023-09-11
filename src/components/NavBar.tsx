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