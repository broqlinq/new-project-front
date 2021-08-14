import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../models/ticket";
import { AlertService } from "../../services/alert.service";
import { UserType } from "../../models/user-data";
import { TicketFilter } from "../../models/ticket-filter";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    @Input() ticketFilter: TicketFilter = {};
    readonly maxTickets: number = 5;
    currentPage: number = 0;
    totalPages: number = 1;
    tickets: Ticket[] = [];
    isAdmin: boolean = false;

    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private ticketService: TicketService) {
    }

    ngOnInit(): void {
        const type = UserType[UserType.ADMIN];
        const user = this.authService.userData;
        this.isAdmin = user.type.toString() === type;
        this.filterTickets(this.ticketFilter);
    }

    filterTickets(filter: TicketFilter): void {
        this.ticketService
            .filterTickets(this.currentPage, this.maxTickets, null, filter)
            .subscribe(page => {
                this.tickets = page.content;
                if (page.totalPages > 0 && this.currentPage >= page.totalPages) {
                    this.currentPage = page.totalPages - 1;
                    this.filterTickets(this.ticketFilter);
                    return;
                }
                this.totalPages = page.totalPages;
                if (page.totalPages === 0) {
                    this.currentPage = 0;
                }
            }, _ => {
                this.alertService.error('Failed to load tickets', { autoClose: true });
            });
    }

    setFilter(filter: TicketFilter): void {
        this.ticketFilter = filter;
        this.filterTickets(this.ticketFilter);
    }

    next(): void {
        if (this.currentPage >= this.totalPages - 1) {
            this.alertService.warn('Maximum page reached, nothing to load', { autoClose: true });
            return;
        }

        this.currentPage++;
        this.filterTickets(this.ticketFilter);
    }

    previous(): void {
        if (this.currentPage <= 0) {
            this.alertService.warn('Minimum page reached, nothing to load', { autoClose: true });
            return;
        }

        this.currentPage--;
        this.filterTickets(this.ticketFilter);
    }

    updateTable(): void {
        this.filterTickets(this.ticketFilter);
    }
}
