import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from "../../models/ticket";
import { Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { AlertService } from "../../services/alert.service";

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

    constructor(
        private router: Router,
        private alertService: AlertService,
        private ticketService: TicketService) {
    }

    ngOnInit(): void {
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
}
