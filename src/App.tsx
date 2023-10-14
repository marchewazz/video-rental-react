import { useEffect, useState } from "react";

import {
  createBrowserRouter,
  Location,
  NavigateFunction,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShowPage from "./pages/ShowPage";
import PopUpContainer from "./components/Notifications/PopUpContainer";
import AddMoneyPage from "./pages/AddMoneyPage";

import io, { Socket } from 'socket.io-client';
import DefaultEventsMap from "socket.io-client";
import OtherUserPage from "./pages/OtherUserPage";
import UserPage from "./pages/UserPage";

import UserData from "./models/UserData.model";
import UserDataResponse from "./models/responses/UserDataResponse.model";
import useWindowDimensions from "./hooks/useWindowDimensions";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import CookiesPage from "./pages/CookiesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppLayout() {

  const [userData, setUserData] = useState<UserData>()
  const [socket, setSocket] = useState<Socket<typeof DefaultEventsMap, typeof DefaultEventsMap> | null>(null);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false)
  const [userDataReady, setUserDataReady] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem("darkMode") == "true" || false)

  const { width, height }: { width: number, height: number } = useWindowDimensions();
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  // const onlyLoggedPaths: string[] = ["/"];
  const onlyNonLoggedPaths: string[] = ["/login", "/register"];

  function connectToSocketServer(): void {
    const socket: Socket = io("http://localhost:8000", { query: { token: localStorage.getItem("token") } });
    setSocket(socket);

    socket.on('connect', () => {
      socket.emit("getUserDataByToken")
    });

    socket.on('getUserDataByToken', (data: UserDataResponse) => {
      if (data.message === "userData") {
        setUserData(data.userData)
        setIsUserLogged(true)
        setUserDataReady(true)
      } else if (data.message === "invalidToken") {
        logout()
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }
  
  function logout() {
    localStorage.setItem("token", "")
    setIsUserLogged(false)
    setUserDataReady(false)
    socket?.disconnect()
    setSocket(null)
    navigate("/login")
  }

  function changeDarkMode(): void {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", (!darkMode.valueOf()).toString())
  }  

  useEffect(() => {
    if (onlyNonLoggedPaths.includes(location.pathname)) {
      if (localStorage.getItem("token")) {
        navigate("/")
      }
    } else {
      if (localStorage.getItem("token")) {
        if (!socket) connectToSocketServer()
      } else {
        navigate("/login")
      }
    }
  }, [location.pathname])

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="bg-dark-green dark:bg-earie-black min-h-screen transition-all duration-300">
        <NavBar userData={userData} isUserLogged={isUserLogged} logoutFunction={logout} onlyNonLoggedPaths={onlyNonLoggedPaths} darkMode={darkMode} darkModeChangeFunction={changeDarkMode} width={width} height={height} />
        <Outlet context={{socket, userData, isUserLogged, userDataReady, darkMode}} />
        <PopUpContainer socket={socket} />
        <Footer />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/show/:showid",
        element: <ShowPage />,
      },
      {
        path: "/add-money",
        element: <AddMoneyPage />
      },
      {
        path: "/user/:userid",
        element: <OtherUserPage />
      },
      {
        path: "/myprofile",
        element: <UserPage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/movies",
        element: <MoviesPage />
      },
      {
        path: "/series",
        element: <SeriesPage />
      },
      {
        path: "/cookies",
        element: <CookiesPage />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "/*",
        element: <NotFoundPage />
      },
    ],
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
