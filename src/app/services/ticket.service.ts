import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Page } from "../models/page";
import { map } from "rxjs/operators";
import { TicketFilter } from "../models/ticket-filter";

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

    filterTickets(page: number, count: number, company: string | null, filter: TicketFilter): Observable<Page<Ticket>> {
        let params = new HttpParams({fromObject: {page, count}})
        if (company) {
            params = params.set('company', company)
        }
        if (filter.oneWay !== undefined && filter.oneWay !== null) {
            params = params.set('oneWay', filter.oneWay);
        }
        if (filter.origin) {
            params = params.set('origin', filter.origin);
        }
        if (filter.destination) {
            params = params.set('destination', filter.destination);
        }
        if (filter.departureDate) {
            params = params.set('departureDate', filter.departureDate.toDateString());
        }
        if (filter.returnDate) {
            params = params.set('returnDate', filter.returnDate.toDateString());
        }
        return this.http.get<Page<Ticket>>(this.baseUrl + '/filter', { params })
            .pipe(map(page => {
                // console.log(JSON.stringify(page));
                return page;
            }));
    }
}
