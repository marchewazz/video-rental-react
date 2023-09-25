export default interface Rental {
    rentalID: string;
    rentalStatus: string;
    rentalShowID: string;
    rentalShowTitle?: string;
    rentalShowPoster?: string;
    rentalStart?: string;
    rentalExpiring?: string;
    rentalCancelledDate?: string;
    rentalExpiredDate?: string;
}