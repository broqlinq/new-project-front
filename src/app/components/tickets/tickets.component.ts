import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../models/ticket";
import { AlertService } from "../../services/alert.service";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    readonly maxTickets: number = 2;
    currentPage: number = 0;
    totalPages: number = 1;
    tickets: Ticket[] = [];

    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private ticketService: TicketService) {}

    ngOnInit(): void {
        this.fetchTickets();
    }

    fetchTickets(): void {
        this.ticketService
            .fetchTickets(this.currentPage, this.maxTickets, null, null)
            .subscribe(page => {
                this.tickets = page.content;
                this.totalPages = page.totalPages;
            }, _ => {
                this.alertService.error('Failed to load tickets');
            });
    }

    next(): void {
        if (this.currentPage >= this.totalPages - 1) {
            this.alertService.warn('Maximum page reached, nothing to load', {autoClose: true});
            return;
        }

        this.currentPage++;
        this.fetchTickets();
    }

    previous(): void {
        if (this.currentPage <= 0) {
            this.alertService.warn('Minimum page reached, nothing to load', {autoClose: true});
            return;
        }

        this.currentPage--;
        this.fetchTickets();
    }
}
