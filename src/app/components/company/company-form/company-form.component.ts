import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from "../../../models/company";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
    @Input() title: string = '';
    @Input() company?: Company;
    @Input() buttonText: string = 'Submit';
    @Input() altButtonText?: string;

    @Output() submitCompany: EventEmitter<Company> = new EventEmitter<Company>();
    @Output() altSubmitCompany: EventEmitter<Company> = new EventEmitter<Company>();
    form: FormGroup;

    formControl = {
        companyName: ['']
    }

    constructor(private formBuilder: FormBuilder) {
        this.form = formBuilder.group(this.formControl);
    }

    ngOnInit(): void {
        this.setCompany(this.company);
    }

    setCompany(company?: Company): void {
        this.company = company;
        this.form.controls.companyName.setValue(this.company?.name)
    }

    onSubmit(): void {
        if (this.company) {
            const company: Company = { id: this.company.id, name: this.form.controls.companyName.value };
            this.submitCompany.emit(company);
        } else {
            const company: Company = { id: 0, name: this.form.controls.companyName.value };
            this.submitCompany.emit(company);
        }
    }

    onAltSubmit(): void {
        if (this.company) {
            const company: Company = { id: this.company.id, name: this.form.controls.companyName.value };
            this.altSubmitCompany.emit(company);
        } else {
            const company: Company = { id: 0, name: this.form.controls.companyName.value };
            this.altSubmitCompany.emit(company);
        }
    }

    nameUnchanged(): boolean {
        return this.company?.name === this.form.controls.companyName.value;
    }
}
