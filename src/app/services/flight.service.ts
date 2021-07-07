import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Flight } from "../models/flight";

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private readonly baseUrl = "http://localhost:8080/flight";

    constructor(private http: HttpClient) {
    }

    fetchAllFlights(): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.baseUrl + '/all');
    }
}
