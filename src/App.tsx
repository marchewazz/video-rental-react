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

function AppLayout() {

  const [userData, setUserData] = useState<UserData>()
  const [socket, setSocket] = useState<Socket<typeof DefaultEventsMap, typeof DefaultEventsMap> | null>(null);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false)
  const [userDataReady, setUserDataReady] = useState<boolean>(false)

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
    <>
      <NavBar userData={userData} isUserLogged={isUserLogged} logoutFunction={logout} />
      <Outlet context={{socket, userData, isUserLogged, userDataReady}} />
      <PopUpContainer socket={socket} />
    </>
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
    ],
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
