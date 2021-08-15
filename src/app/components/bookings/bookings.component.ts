import { Component, OnInit } from '@angular/core';
import { Booking } from "../../models/booking";
import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert.service";
import { BookingService } from "../../services/booking.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
    bookings: Booking[] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private bookingService: BookingService
    ) {
    }

    ngOnInit(): void {
        this.refreshBookingTable();
    }

    refreshBookingTable(): void {
        const user = this.authService.userData;

        if (!user) return;

        this.bookingService
            .fetchUserBookings(user.username)
            .subscribe(bookings => {
                this.bookings = bookings;
            });
    }

    isCancelable(booking: Booking) {
        const departs = new Date(booking.ticket.departureDate);
        const now = new Date();
        const diff = (departs.getTime() - now.getTime()) / 3600000;
        return diff >= 24;
    }

    deleteBooking(booking: Booking): void {
        const departs = new Date(booking.ticket.departureDate);
        const now = new Date();
        const diff = (departs.getTime() - now.getTime()) / 3600000;
        console.log(diff);
        this.bookingService
            .deleteBooking(booking.id)
            .subscribe(_ => {
                this.alertService.success('Booking successfully deleted', { autoClose: true });
                this.refreshBookingTable();
            }, err => {
                this.alertService.error(`Failed to delete booking: ${err.error}`, { autoClose: true });
            })
    }

    buyTickets(): void {
        this.bookingService
            .buyTickets(this.bookings.filter(b => b.available))
            .subscribe(_ => {
                this.alertService.success('Successfully bought tickets!', { autoClose: true });
                const user = this.authService.userData;
                if (user) {
                    this.bookingService
                        .fetchUserBookings(user.username)
                        .subscribe();
                }
                this.router.navigate(['home']);
            }, err => {
                this.alertService.error(`Failed to buy tickets: ${err.error}`, { autoClose: true });
            });
    }

}
