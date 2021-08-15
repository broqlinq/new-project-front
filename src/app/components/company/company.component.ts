import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { TicketsComponent } from "../tickets/tickets.component";
import { TicketFilter } from "../../models/ticket-filter";
import { AuthService } from "../../services/auth.service";
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company";
import { CompanyFormComponent } from "./company-form/company-form.component";
import { AlertService } from "../../services/alert.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    @ViewChild('settings') settings?: CompanyFormComponent;
    @ViewChild(TicketsComponent) tickets?: TicketsComponent;
    filter: TicketFilter = {}
    company: string = '';
    companyObj?: Company;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private ticketService: TicketService,
        private authService: AuthService,
        private companyService: CompanyService
    ) {
    }

    ngOnInit(): void {
        console.log(`for company: ${this.tickets?.forCompany}`);
        this.route.paramMap
            .subscribe(params => {
                const _company = params.get('company');
                this.company = _company ? _company.split('-').join(' ') : '';
                console.log(`${_company}, ${this.company}`);
                this.companyService
                    .fetchByName(this.company)
                    .subscribe(company => {
                        this.companyObj = company;
                        this.settings?.setCompany(this.companyObj);
                    })
            })
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    filterTickets(filter: TicketFilter) {
        this.filter = filter;
        this.tickets?.setFilter(filter);
    }

    createCompany(company: Company): void {
        this.companyService
            .createCompany(company)
            .subscribe(comp => {
                this.alertService.success(`Successfully created company '${comp.name}'`, { autoClose: true });
            }, err => {
                this.alertService.error(`Failed to create company: ${err.error}`, { autoClose: true });
            });
    }

    updateCompany(company: Company): void {
        this.companyService
            .updateCompany(company)
            .subscribe(comp => {
                this.alertService.success(`Successfully updated company name to '${comp.name}'`, { autoClose: true });
                this.reload(comp);
            }, err => {
                this.alertService.error(`Failed to update company name: ${err.error}`, { autoClose: true });
            });
    }

    deleteCompany(company: Company): void {
        this.companyService
            .deleteCompany(company)
            .subscribe(_ => {
                this.alertService.success(`Successfully deleted company '${company.name}'`, { autoClose: true });
                this.router.navigate(['home']);
            }, err => {
                this.alertService.error(`Failed to delete company: ${err.error}`, { autoClose: true });
            })
    }

    private reload(company: Company): void {
        const _company = company.name.split(' ').join('-');
        this.router.navigate([`company/${_company}`]);
    }
}
