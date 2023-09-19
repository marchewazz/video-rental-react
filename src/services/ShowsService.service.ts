import axios, { AxiosResponse } from "axios"

export default class ShowsService {
    async getShowData(showID: string): Promise<AxiosResponse<any, any>> {
        return await axios.get(`${process.env.REACT_APP_OMDB_URL}&i=${showID}`)
    }
}