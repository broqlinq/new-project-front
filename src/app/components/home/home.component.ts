import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TicketService } from "../../services/ticket.service";
import { Router } from "@angular/router";
import { TicketFilter } from "../../models/ticket-filter";
import { TicketsComponent } from "../tickets/tickets.component";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild(TicketsComponent) tickets?: TicketsComponent;
    form: FormGroup;
    cities: string[] = []
    filter: TicketFilter = {};
    isAdmin = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private ticketService: TicketService,
        private authService: AuthService) {
        this.form = formBuilder.group({
            origin: [],
            destination: [],
            departureDate: [],
            returnDate: []
        });
    }

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
    }

    filterTickets(filter: TicketFilter) {
        this.tickets?.setFilter(filter);
    }

    updateTable(): void {
        this.tickets?.setFilter(this.filter);
    }
}
