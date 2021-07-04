import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from "../../models/ticket";

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

    constructor() {
    }

    ngOnInit(): void {
    }

}
