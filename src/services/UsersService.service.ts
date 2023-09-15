import axios from "axios";

export default class UsersService {
    async getUserDataByID(userID: string) {
        return await axios.post("http://localhost:8000/api/users/userDataByID", {userID: userID})
    }
}