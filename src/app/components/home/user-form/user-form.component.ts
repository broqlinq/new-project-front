import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { UserType } from "../../../models/user-data";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    form: FormGroup;
    hide: boolean = true
    private readonly passRegex: string = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,32}$";
    private controlConfig = {
        username: ['', [Validators.required]],
        password: ['', [Validators.pattern(this.passRegex)]],
        userType: ['', [Validators.required]],
    };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService) {
        this.form = formBuilder.group(this.controlConfig);
    }

    get f(): FormGroup {
        return this.form
    };

    ngOnInit(): void {
    }

    createUser(): void {
        if (!this.form.valid) {
            this.alertService.error('Invalid form format. Please enter all required fields.', { autoClose: true })
            return;
        }
        const username = this.f.controls.username.value;
        const password = this.f.controls.password.value;
        const type = this.f.controls.userType.value;
        let userType: UserType;
        switch (type) {
            case 'user':
                userType = UserType.REGULAR;
                break;
            case 'admin':
                userType = UserType.ADMIN;
                break;
            default:
                this.alertService.error('Invalid form format. Choose valid user type');
                return;
        }
        this.authService.register(username, password, userType)
            .subscribe(_ => {
                this.clearForm();
                this.alertService.success(`User '${username}' successfully registered.`, { autoClose: true });
            }, err => {
                const message = err.error?.message;
                // console.info(message);
                this.alertService.error(`Registration failed: ${message}`, { autoClose: true });
            });
    }

    private clearForm(): void {
        this.form.reset();
        for (const ctrl in this.form.controls) {
            this.form.controls[ctrl].setErrors(null);
        }
    }

}
