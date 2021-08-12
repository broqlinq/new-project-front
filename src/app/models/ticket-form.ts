export interface TicketForm {
    departureDate: Date,
    returnDate: Date | null,
    companyId: number,
    flightId: number,
    count: number
}
