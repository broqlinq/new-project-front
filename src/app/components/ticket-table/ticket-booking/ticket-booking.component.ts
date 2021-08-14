import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Ticket } from "../../../models/ticket";

@Component({
    selector: 'app-ticket-booking',
    templateUrl: './ticket-booking.component.html',
    styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {
    @Input() ticket: Ticket | undefined;
    form: FormGroup;
    controlConfig = {
        ticketCount: ['']
    }

    @Output() onBookTickets: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group(this.controlConfig);
    }

    ngOnInit(): void {}

    firePressed(): void {
        const count: number = this.form.controls.ticketCount.value;
        this.onBookTickets.emit({ ticket: this.ticket,  count: count });
    }
}
