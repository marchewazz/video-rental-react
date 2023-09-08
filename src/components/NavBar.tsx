import strings from "../utilities/strings";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/login">{ strings.nav.login }</a>
                    <a href="/register">{ strings.nav.register }</a>
                </li>
            </ul>
        </nav>
    )
}