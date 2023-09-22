import { Location, useLocation } from "react-router-dom";
import UserData from "../models/UserData.model";
import strings from "../utilities/strings";
import DarkModeTogger from "../DarkModeToggler";

export default function NavBar(props: {
  userData: UserData | undefined;
  isUserLogged: boolean;
  logoutFunction: React.MouseEventHandler<HTMLButtonElement>;
  onlyNonLoggedPaths: string[];
  darkMode: boolean;
  darkModeChangeFunction: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const location: Location = useLocation();

  return (
    <nav className="border-b-2 border-light-green h-[100px] dark:bg-earie-black transition-all duration-300">
      <div className="container flex justify-between items-center h-full">
        <div>
            <a href="/">
                <img className="w-16 m-2 dark:invert" src="images/logo.png" />
            </a>
        </div>
        {!props.onlyNonLoggedPaths.includes(location.pathname) ? (
          <>
            {props.userData ? (
              <>
                <div className="nav-item">
                  {strings.formatString(strings.nav.balanceInfo, {
                    balance: props.userData.userBalance,
                  })}
                </div>
                <div className="nav-item-clickable">
                  <a href="/add-money">{strings.nav.addMoney}</a>
                </div>
                <div className="nav-item-clickable">
                  <a href="/myprofile">
                    {" "}
                    {strings.formatString(strings.nav.greeting, {
                      nickName: props.userData.userNick,
                    })}
                  </a>
                </div>
                <button className="nav-item-clickable p-4" onClick={props.logoutFunction}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : (
          <>
            <div className="nav-item-clickable">
                <a href="/login">{strings.nav.login}</a>
            </div>
            <div className="nav-item-clickable">
                <a href="/register">{strings.nav.register}</a>
            </div>
          </>
        )}
        <DarkModeTogger darkMode={props.darkMode} darkModeChangeFunction={props.darkModeChangeFunction} />
      </div>
    </nav>
  );
}
