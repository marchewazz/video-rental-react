import axios, { AxiosResponse } from "axios";

export default class UsersService {
    async getUserDataByID(userID: string): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/userDataByID`, {userID: userID})
    }
    async searchForUsers(searchPhrase: string): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/search`, {searchPhrase: searchPhrase})
    }
}