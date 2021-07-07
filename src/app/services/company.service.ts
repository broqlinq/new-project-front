import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../models/company";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private readonly baseUrl = "http://localhost:8080/company"

    constructor(private http: HttpClient) {
    }

    fetchAllCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.baseUrl + '/all');
    }
}
