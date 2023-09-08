import axios from "axios"
import RegisterFormData from "../models/RegisterFormData.model"

export default class AuthService {
    async registerUser(userData: RegisterFormData): Promise<Response> {
        console.log(userData);
        
        return await axios.post("http://localhost:8000/api/users/register", userData)
    }

    loginUser() {

    }
}