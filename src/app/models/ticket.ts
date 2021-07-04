export interface Ticket {
    id: number;
    departureDate: Date;
    returnDate: Date;
    flight: TicketFlight;
    company: string;
    count: number;
}

export interface TicketFlight {
    id: number;
    origin: string;
    destination: string;
}
