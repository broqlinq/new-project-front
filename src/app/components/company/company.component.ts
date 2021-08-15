import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { TicketsComponent } from "../tickets/tickets.component";
import { TicketFilter } from "../../models/ticket-filter";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    @ViewChild(TicketsComponent) tickets?: TicketsComponent;
    filter: TicketFilter = {}
    company: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        console.log(`for company: ${this.tickets?.forCompany}`);
        this.route.paramMap
            .subscribe(params => {
                const _company = params.get('company');
                this.company = _company ? _company.split('-').join(' ') : '';
                console.log(`${_company}, ${this.company}`);
            })
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    filterTickets(filter: TicketFilter) {
        this.filter = filter;
        this.tickets?.setFilter(filter);
    }

}
