import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TicketService } from "../../../services/ticket.service";
import { Company } from "../../../models/company";
import { Flight } from "../../../models/flight";
import { FlightService } from "../../../services/flight.service";
import { CompanyService } from "../../../services/company.service";
import { AlertService } from "../../../services/alert.service";
import { Ticket } from "../../../models/ticket";
import { TicketForm } from "../../../models/ticket-form";

@Component({
    selector: 'app-ticket-form',
    templateUrl: './ticket-form.component.html',
    styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
    @Output() ticketCreated: EventEmitter<Ticket> = new EventEmitter<Ticket>();
    form: FormGroup;
    companies: Company[] = [];
    flights: Flight[] = [];
    private controlConfig = {
        departureDate: [''],
        returnDate: [''],
        count: ['', Validators.min(1)],
        companyId: [''],
        flightId: [''],
    };

    constructor(
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private ticketService: TicketService,
        private flightService: FlightService,
        private companyService: CompanyService) {
        this.form = formBuilder.group(this.controlConfig);
    }

    get f() {
        return this.form
    }

    ngOnInit(): void {
        this.loadCompanies()
        this.loadFlights()
    }

    loadCompanies(): void {
        this.companyService
            .fetchAllCompanies()
            .subscribe(companies => this.companies = companies,
                err => this.alertService.error(`Error fetching company list: ${err.error}`));
    }

    loadFlights(): void {
        this.flightService
            .fetchAllFlights()
            .subscribe(flights => this.flights = flights,
                err => this.alertService.error(`Error fetching flight list: ${err.error}`));
    }

    resetForm(): void {
        this.form.reset();
    }

    createTicket(): void {
        const departureDate: Date = this.form.controls.departureDate.value;
        const returnDate: Date = this.form.controls.returnDate.value;
        const companyId: number = this.form.controls.companyId.value;
        const flightId: number = this.form.controls.flightId.value;
        const count: number = this.form.controls.count.value;
        const ticket: TicketForm = { departureDate, returnDate, companyId, flightId, count };
        console.log(ticket);
        this.ticketService
            .createTicket(ticket)
            .subscribe(ticket => {
                this.alertService.success('Successfully created ticket!', { autoClose: true });
                this.ticketCreated.emit(ticket);
                this.resetForm();
            }, error => {
                this.alertService.error(`Failed to create ticket: ${error.message}`, { autoClose: true });
            });
    }
}
