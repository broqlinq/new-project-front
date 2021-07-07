export interface TicketFilter {
    origin?: string;
    destination?: string;
    departureDate?: Date;
    returnDate?: Date;
    oneWay?: boolean;
}
