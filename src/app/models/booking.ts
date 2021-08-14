
export interface Booking {
    id: number,
    available: boolean,
    count: number,
    ticket: BookingTicket,
    user: BookingUser
}

export interface BookingTicket {
    id: number,
    departureDate: Date,
    returnDate: Date,
    flight: BookingTicketFlight,
    company: string,
    count: number
}

export interface BookingUser {
    id: number,
    username: string
}

export interface BookingTicketFlight {
    id: number,
    origin: string,
    destination: string
}
