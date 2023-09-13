import axios from "axios"

export default class ShowsService {
    async getShowData(showID: string): Promise<Response> {
        return await axios.get(`${process.env.REACT_APP_OMDB_URL}&i=${showID}`)
    }
}