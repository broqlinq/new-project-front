import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Company } from "../../models/company";
import { Flight } from "../../models/flight";
import { CompanyService } from "../../services/company.service";
import { FlightService } from "../../services/flight.service";
import { AlertService } from "../../services/alert.service";
import { Ticket } from "../../models/ticket";
import { TicketForm } from "../../models/ticket-form";
import { TicketUpdateForm } from "../../models/ticket-update-form";

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
    form: FormGroup;
    companies: Company[] = [];
    flights: Flight[] = [];
    ticket: Ticket | null = null;
    private controlConfig = {
        departureDate: [''],
        returnDate: [''],
        count: ['', Validators.min(1)],
        companyId: [''],
        flightId: [''],
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService,
        private companyService: CompanyService,
        private flightService: FlightService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group(this.controlConfig);
    }

    ngOnInit(): void {
        this.loadCompanies();
        this.loadFlights();
        this.route.paramMap
            .subscribe(params => {
                const id = Number.parseInt(<string>params.get('id'));
                this.ticketService.getTicket(id)
                    .subscribe(ticket => {
                        this.ticket = ticket;
                        this.form.controls.departureDate.setValue(ticket.departureDate);
                        this.form.controls.returnDate.setValue(ticket.returnDate);
                        this.form.controls.count.setValue(ticket.count);
                        this.form.controls.companyId.setValue(this.companies.find(c => c.name === ticket.company)?.id);
                        this.form.controls.flightId.setValue(ticket.flight.id);
                        console.log(ticket);
                    }, _ => {
                        this.alertService.error(`Error fetching ticket with id=${id}`);
                        this.router.navigate(['home']);
                    });
            });
    }

    loadCompanies(): void {
        this.companyService
            .fetchAllCompanies()
            .subscribe(companies => this.companies = companies,
                error => this.alertService.error(`Error fetching company list: ${error.message}`));
    }

    loadFlights(): void {
        this.flightService
            .fetchAllFlights()
            .subscribe(flights => this.flights = flights,
                error => this.alertService.error(`Error fetching flight list: ${error.message}`));
    }

    goBack(): void {
        this.router.navigate(['home'])
    }

    saveChanges(): void {
        const id = this.ticket?.id;
        const departureDate: Date = this.form.controls.departureDate.value;
        const returnDate: Date = this.form.controls.returnDate.value;
        const companyId: number = this.form.controls.companyId.value;
        // @ts-ignore
        const companyName: string = this.companies.find(c => c.id == companyId)?.name;
        const flightId: number = this.form.controls.flightId.value;
        const count: number = this.form.controls.count.value;
        // @ts-ignore
        const ticket: TicketUpdateForm = { id, departureDate, returnDate, companyName, flightId, count };
        console.log(`new ticket info: ${ticket}`);
        this.ticketService.updateTicket(ticket)
            .subscribe(_ => {
                this.alertService.success(`Ticket successfully updated`, { autoClose: true });
            }, err => {
                this.alertService.error(`Ticket update failed: ${err.error}`, { autoClose: true });
            })
    }

}
