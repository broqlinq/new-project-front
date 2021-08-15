export interface FilterRequest {
    origin?: string,
    destination?: string,
    departureDate?: Date,
    returnDate?: Date,
    company?: string,
    oneWay?: boolean,
    page: number,
    count: number
}
