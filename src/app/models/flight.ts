export interface Flight {
    id: number;
    origin: string;
    destination: string;
    tickets: FlightTicket[];
}

export interface FlightTicket {
    id: number;
    departureDate: Date;
    returnDate: Date;
    company: string;
    count: number;
}
