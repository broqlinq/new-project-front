import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Booking } from "../models/booking";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    readonly bookings: Observable<Booking[]>;
    private readonly baseUrl: string = "http://localhost:8080/booking"
    private readonly bookingsSubject: BehaviorSubject<Booking[]>;

    constructor(
        private authService: AuthService,
        private http: HttpClient) {
        this.bookingsSubject = new BehaviorSubject<Booking[]>([]);
        this.bookings = this.bookingsSubject.asObservable();
    }

    fetchUserBookings(username: string): Observable<Booking[]> {
        let params = new HttpParams({ fromObject: { username } });
        return this.http.get<Booking[]>(this.baseUrl, { params })
            .pipe(map(bookings => {
                // console.log('updating bookings subject...');
                this.bookingsSubject.next(bookings);
                return bookings;
            }))
    }

    buyTickets(bookings: Booking[]): Observable<Booking[]> {
        const ids = bookings.map(b => b.id);
        return this.http.post<Booking[]>(this.baseUrl + '/buy', ids);
    }

    createBooking(username: string, ticketId: number, count: number): Observable<Booking> {
        return this.http.post<Booking>(this.baseUrl + "/create", { username, ticketId, count })
            .pipe(map(booking => {
                const user = this.authService.userData;
                if (user) {
                    // console.log('created, now fetching...')
                    this.fetchUserBookings(user.username).subscribe();
                }
                return booking;
            }));
    }

    deleteBooking(id: number): Observable<Booking> {
        let params = new HttpParams({ fromObject: { id } });
        return this.http.delete<Booking>(this.baseUrl, { params });
    }
}
