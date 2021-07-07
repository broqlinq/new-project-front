import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    private readonly passRegex: string = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,32}$";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.pattern(this.passRegex)]]
        });
    }

    get f() {
        return this.form?.controls;
    }

    ngOnInit() {
    }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form?.invalid) {
            return;
        }

        this.loading = true;
        this.authService.logIn(this.f?.username.value, this.f?.password.value)
            // .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/home`;
                    this.router.navigateByUrl(returnUrl);
                },
                error: err => {
                    switch (err.status) {
                        case 400:
                        case 401:
                            this.alertService.error('Login failed. Check your credentials.');
                            break;
                        default:
                            this.alertService.error('Login failed. Unexpected error occurred while trying to contact server.')
                    }

                    this.loading = false;
                }
            });
    }
}
