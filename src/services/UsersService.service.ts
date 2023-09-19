import axios, { AxiosResponse } from "axios";

export default class UsersService {
    async getUserDataByID(userID: string): Promise<AxiosResponse<any, any>> {
        return await axios.post("http://localhost:8000/api/users/userDataByID", {userID: userID})
    }
}