import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from "../../models/ticket";
import { Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { AlertService } from "../../services/alert.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BookingService } from "../../services/booking.service";
import { AuthService } from "../../services/auth.service";
import { Booking } from "../../models/booking";

@Component({
    selector: 'app-ticket-table',
    templateUrl: './ticket-table.component.html',
    styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit {
    @Input() tickets: Ticket[] = [];
    @Input() isAdmin: boolean = false;
    @Input() forCompany: boolean = false;
    @Input() company: string = '';

    @Output() ticketDeleted: EventEmitter<Ticket> = new EventEmitter<Ticket>();
    @Output() ticketsBooked: EventEmitter<Booking> = new EventEmitter<Booking>();
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private ticketService: TicketService,
        private bookingService: BookingService) {
        this.form = this.formBuilder.group([{
            toBook: ['']
        }]);
    }

    ngOnInit(): void {
    }

    bookTickets(event: any): void {
        const ticket: Ticket = event.ticket;
        const count: number = event.count;
        const username: string = this.authService.userData.username;
        this.bookingService
            .createBooking(username, ticket.id, count)
            .subscribe(booking => {
                this.alertService.success('Successfully booked tickets!', { autoClose: true });
                this.ticketsBooked.emit(booking);
            }, err => {
                this.alertService.error(`Failed to book tickets: ${err.error}`, { autoClose: true });
            });
    }

    editTicket(ticket: Ticket): void {
        this.router.navigate([`ticket/${ticket.id}`]);
    }

    deleteTicket(ticket: Ticket): void {
        this.ticketService.deleteTicket(ticket.id)
            .subscribe(ticket => {
                this.ticketDeleted.emit(ticket);
            }, err => {
                this.alertService.warn(`Failed to delete ticket: ${err.error}`, { autoClose: true });
            })
    }

    toCompanyPage(company: string): void {
        console.log(company);
        const _company = company.split(' ').join('-')
        this.router.navigate([`company/${_company}`]);
    }
}
