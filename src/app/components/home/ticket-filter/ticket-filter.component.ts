import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TicketFilter } from "../../../models/ticket-filter";
import { CityService } from "../../../services/city.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'app-ticket-filter',
    templateUrl: './ticket-filter.component.html',
    styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {
    form: FormGroup;
    cities: string[] = ['London', 'Paris', 'Berlin', 'Moscow'];
    @Output() onFilter: EventEmitter<TicketFilter> = new EventEmitter<TicketFilter>();

    constructor(
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private cityService: CityService
    ) {
        this.form = formBuilder.group({
            origin: [],
            destination: [],
            departureDate: [],
            returnDate: [],
            oneWay: ['all']
        });
    }

    ngOnInit(): void {
        this.cityService
            .fetchAllCities()
            .subscribe(cities => {
                this.cities = cities.map(c => c.name);
            }, error => {
                this.alertService.error(`Failed to fetch cities: ${error.message}`)
            });
    }

    filter(): void {
        const origin = this.form.controls.origin.value;
        const destination = this.form.controls.destination.value;
        const departureDate = this.form.controls.departureDate.value;
        const returnDate = this.form.controls.returnDate.value;
        let oneWay;
        switch (this.form.controls.oneWay.value) {
            case 'oneWay': oneWay = true; break;
            case 'twoWay': oneWay = false; break;
            default: oneWay = undefined;
        }
        const filter: TicketFilter = { origin, destination, departureDate, returnDate, oneWay };
        this.onFilter.emit(filter);
    }

}
