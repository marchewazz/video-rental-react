import { Socket } from "socket.io-client";
import UserData from "./UserData.model";

export default interface Context {
    socket: Socket, 
    userData: UserData, 
    isUserLogged: boolean, 
    userDataReady: boolean,
    darkMode: boolean,
    width: number
}