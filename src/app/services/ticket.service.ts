import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Page } from "../models/page";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private readonly baseUrl: string = 'http://localhost:8080/ticket'
    private tickets: BehaviorSubject<Ticket[]>;

    constructor(private http: HttpClient) {
        this.tickets = new BehaviorSubject<Ticket[]>([]);
    }

    fetchTickets(page: number, count: number, company: string | null, oneWay: boolean | null): Observable<Page<Ticket>> {
        let params = new HttpParams({fromObject: {page, count}})
        if (company !== null) {
            params = params.set('company', company)
        }
        if (oneWay !== null) {
            params = params.set('oneWay', oneWay);
        }
        return this.http.get<Page<Ticket>>(this.baseUrl + '/filter', { params })
            .pipe(map(page => {
                // console.log(JSON.stringify(page));
                this.tickets.next(page.content);
                return page;
            }));
    }
}
