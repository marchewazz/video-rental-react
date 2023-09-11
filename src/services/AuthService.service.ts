import axios from "axios"
import RegisterFormData from "../models/RegisterFormData.model"
import LoginFormData from "../models/LoginFormData.model"

export default class AuthService {
    async registerUser(userData: RegisterFormData): Promise<Response> {
        return await axios.post("http://localhost:8000/api/users/register", userData)
    }

    async loginUser(userData: LoginFormData) {
        return await axios.post("http://localhost:8000/api/users/login", userData)
    }
}