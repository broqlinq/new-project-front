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

    fetchByName(companyName: string): Observable<Company> {
        return this.http.post<Company>(this.baseUrl + '/get', companyName);
    }

    createCompany(company: Company): Observable<Company> {
        console.log(`from create company:`)
        console.log(company)
        return this.http.post<Company>(this.baseUrl, company);
    }

    updateCompany(company: Company): Observable<Company> {
        console.log(`from update company:`)
        console.log(company)
        return this.http.put<Company>(this.baseUrl, company);
    }

    fetchAllCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.baseUrl + '/all');
    }

    deleteCompany(company: Company): Observable<Company> {
        return this.http.delete<Company>(this.baseUrl, { body: company });
    }
}
