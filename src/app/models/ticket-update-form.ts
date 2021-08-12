export interface TicketUpdateForm {
    id: number;
    departureDate: Date;
    returnDate: Date;
    flightId: number;
    companyName: string;
    count: number;
}
