import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserType } from "../../models/user-data";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    goHome() {
        if (!this.authService.userData) {
            this.router.navigate(['login']);
            return;
        }

        let userType;
        switch (this.authService.userData.type) {
            case UserType.ADMIN:
                userType = 'admin';
                break;
            case UserType.REGULAR:
                userType = 'user';
                break;
            default:
                userType = 'user';
        }
        this.router.navigate([`${userType}/home`]);
    }
}
