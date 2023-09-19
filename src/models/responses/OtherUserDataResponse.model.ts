import OtherUserData from "../OtherUserData.model";

export default interface OtherUserDataResponse {
    message: string,
    userData?: OtherUserData
}