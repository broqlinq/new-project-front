import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from "../../models/user-data";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BookingService } from "../../services/booking.service";
import { map } from "rxjs/operators";
import { Booking } from "../../models/booking";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    user?: UserData;
    userSubscription: Subscription;
    bookingsSubscription: Subscription;
    userBookings: Booking[] = [];
    userBookingCount: number = 0;

    constructor(
        private router: Router,
        private authService: AuthService,
        private bookingService: BookingService) {

        this.userSubscription = authService.loggedUser
            .subscribe(user => this.user = user);

        this.bookingsSubscription = bookingService.bookings
            .subscribe(bookings => this.updateBookings(bookings));
    }

    ngOnInit(): void {
        const user = this.authService.userData;
        if (!user) {
            this.router.navigate(['login']);
            return;
        }
        this.bookingService.fetchUserBookings(user.username)
            .subscribe(bookings => this.updateBookings(bookings))
    }

    updateBookings(bookings: Booking[]): void {
        this.userBookings = bookings;
        this.userBookingCount = bookings.map(b => b.count).reduce((sum, x) => sum + x, 0);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
        this.bookingsSubscription.unsubscribe();
    }

    logOut(): void {
        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    toBookings(): void {

    }
}
