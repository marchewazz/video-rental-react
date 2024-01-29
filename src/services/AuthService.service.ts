import axios, { AxiosResponse } from "axios"
import RegisterFormData from "../models/RegisterFormData.model"
import LoginFormData from "../models/LoginFormData.model"

export default class AuthService {
    async registerUser(userData: RegisterFormData): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, userData)
    }

    async loginUser(userData: LoginFormData): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, userData)
    }

    async generateUser(): Promise<AxiosResponse<any, any>> {
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/generate`)
    }
}