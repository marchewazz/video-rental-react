import { Link, Location, useLocation } from "react-router-dom";
import UserData from "../models/UserData.model";
import strings from "../utilities/strings";
import DarkModeToggler from "./DarkModeToggler";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import LoadingComponent from "./LoadingComponent";

import { animate } from "framer-motion"
import LanguageSetter from "./LanguageSetter";

export default function NavBar(props: {
  userData: UserData | undefined;
  isUserLogged: boolean;
  logoutFunction: React.MouseEventHandler<HTMLButtonElement>;
  onlyNonLoggedPaths: string[];
  darkMode: boolean;
  darkModeChangeFunction: React.ChangeEventHandler<HTMLInputElement>;
  languageChangeFunction: Function;
  height: number;
  width: number;
}) {
  const [showMobileNavigation, setShowMobileNavigation] =
    useState<boolean>(false);

  const mobileNavBarRef = useRef(null);
  const mobileNavBarBackgroundRef = useRef(null);

  const location: Location = useLocation();
  
  const links = (
    <>
      { !props.onlyNonLoggedPaths.includes(location.pathname) ? (
          <>
            {props.userData ? (
            <>
          <div className="nav-item flex items-center pl-4 mb-2 lg:mb-0 lg:pl-0">
            {strings.formatString(strings.nav.balanceInfo, {
              balance: props.userData.userBalance,
            })}
          </div>
            <Link
              className={`nav-item-clickable p-4 ${props.width >= 1024 ? "parallelogram" : ""}`}
              to="/add-money">
              {strings.nav.addMoney}
            </Link>
            <Link
              className={`nav-item-clickable p-4 ${props.width >= 1024 ? "parallelogram" : ""}`}
              to="/myprofile"
            >
              {" "}
              {strings.formatString(strings.nav.greeting, {
                nickName: props.userData.userNick,
              })}
            </Link>
          <button
            className={`nav-item-clickable p-4 ${props.width >= 1024 ? "parallelogram px-4" : ""}`}
            onClick={props.logoutFunction}
          >
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
          <div className="flex items-center justify-center">
            <LoadingComponent />
          </div>
        )}
        </>
        ) : (
          <>
            <Link className={`nav-item-clickable p-4 ${props.width >= 1024 ? "parallelogram" : ""}`} to="/login">{strings.nav.login}</Link>
            <Link className={`nav-item-clickable p-4 ${props.width >= 1024 ? "parallelogram" : ""}`} to="/register">{strings.nav.register}</Link>
          </>
        )}
    </>
  );

  useEffect(() => {
    if (props.width >= 1024) setShowMobileNavigation(false)
  }, [props.width])

  useEffect(() => {
    if (location && mobileNavBarBackgroundRef.current && mobileNavBarRef.current) hideAnimation()
  }, [location.pathname])
  

  useEffect(() => {
    if (showMobileNavigation) {
      showAnimation()
    }
  }, [showMobileNavigation])
  
  function showAnimation() {
    animate(mobileNavBarRef.current, { x: ["100%", "0%"] }, { duration: .2 })
    animate(mobileNavBarBackgroundRef.current, { opacity: [0, .8] }, { duration: .2 })
  }

  function hideAnimation() {
    animate(mobileNavBarRef.current, { x: ["0%", "100%"] }, { duration: .2 })
    animate(mobileNavBarBackgroundRef.current, { opacity: [.8, 0] }, { duration: .2 }).then(() => setShowMobileNavigation(false))
  }

  return (
    <nav className="border-b-2 border-light-green h-[100px] bg-dark-green dark:bg-earie-black transition-all duration-300 w-full fixed top-0 z-[9999]">
      <div className="container flex justify-between items-center h-full transition-all duration-300">
        <div>
          <Link to="/">
            <img className="w-16 m-2 dark:invert" src="/images/logo.png" />
          </Link>
        </div>
          <>
            {props.width < 1024 ? (
              <button onClick={() => setShowMobileNavigation(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-white dark:text-light-green"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            ) : (
              <>
                {links}
                <SearchBar />
                <div className="flex flex-col items-center">
                  <DarkModeToggler
                    darkMode={props.darkMode}
                    darkModeChangeFunction={props.darkModeChangeFunction}
                  />
                  <LanguageSetter languageChangeFunction={props.languageChangeFunction} />
                </div>
              </>
            )}
          </>
      </div>
      {showMobileNavigation ? (
        <>
          <div
            ref={mobileNavBarBackgroundRef}
            onClick={() => hideAnimation()}
            className="w-screen h-screen absolute bg-earie-black z-[1023] top-0 left-0 opacity-80 cursor-pointer"
          ></div>
          <div ref={mobileNavBarRef} className="absolute h-screen w-2/3 sm:w-1/2 md:w-1/3 bg-white dark:bg-earie-black top-0 right-0 z-[1024] flex flex-col">
            <button className="bg-light-green self-end p-2 rounded-full m-2"
            onClick={() => hideAnimation()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <Link to="/">
                <img className="w-16 ml-4 mb-5 dark:invert" src="/images/logo.png" />
              </Link>
            </div>
            {links}
            <SearchBar />
            <DarkModeToggler
              darkMode={props.darkMode}
              darkModeChangeFunction={props.darkModeChangeFunction}
            />
            <LanguageSetter languageChangeFunction={props.languageChangeFunction} />
          </div>
        </>
      ) : null}
    </nav>
  );
}
