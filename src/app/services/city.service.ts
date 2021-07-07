import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/city";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private readonly baseUrl = 'http://localhost:8080/city'

    constructor(private http: HttpClient) {
    }

    fetchAllCities(): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + '/all');
    }
}
