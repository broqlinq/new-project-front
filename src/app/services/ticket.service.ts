import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Page } from "../models/page";
import { map } from "rxjs/operators";
import { TicketFilter } from "../models/ticket-filter";
import { TicketForm } from "../models/ticket-form";
import { TicketUpdateForm } from "../models/ticket-update-form";
import { FilterRequest } from "../models/filter-request";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private readonly baseUrl: string = 'http://localhost:8080/ticket'
    private tickets: BehaviorSubject<Ticket[]>;

    constructor(private http: HttpClient) {
        this.tickets = new BehaviorSubject<Ticket[]>([]);
    }

    getTicket(id: number): Observable<Ticket> {
        return this.http.get<Ticket>(this.baseUrl + `/${id}`);
    }

    createTicket(ticket: TicketForm): Observable<Ticket> {
        console.log(ticket);
        return this.http.post<Ticket>(this.baseUrl + '/create', ticket);
    }

    updateTicket(ticket: TicketUpdateForm): Observable<Ticket> {
        console.log(ticket);
        return this.http.put<Ticket>(this.baseUrl, ticket);
    }

    deleteTicket(id: number): Observable<Ticket> {
        let params = new HttpParams({ fromObject: { id } });
        return this.http.delete<Ticket>(this.baseUrl, { params })
    }

    fetchTickets(page: number, count: number, company: string | null, oneWay: boolean | null): Observable<Page<Ticket>> {
        let params = new HttpParams({ fromObject: { page, count } })
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
        let params = new HttpParams({ fromObject: { page, count } })
        if (company && company.trim() !== '') {
            params = params.set('company', encodeURIComponent(company.trim()))
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
            params = params.set('departureDate', encodeURIComponent(filter.departureDate.toUTCString()));
        }
        if (filter.returnDate) {
            params = params.set('returnDate', encodeURIComponent(filter.returnDate.toUTCString()));
        }
        console.log(params)
        return this.http.get<Page<Ticket>>(this.baseUrl + '/filter', { params })
            .pipe(map(page => {
                // console.log(JSON.stringify(page));
                return page;
            }));
    }

    _filterTickets(page: number, count: number, filter: TicketFilter, company?: string): Observable<Page<Ticket>> {
        const _filter: FilterRequest = {
            origin: filter.origin,
            destination: filter.destination,
            departureDate: filter.departureDate,
            returnDate: filter.returnDate,
            oneWay: filter.oneWay,
            company: company?.trim() === '' ? undefined : company?.trim(),
            page: page,
            count: count
        };
        return this.http.post<Page<Ticket>>(this.baseUrl + '/filter', _filter);
    }
}
