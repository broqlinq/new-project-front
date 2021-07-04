import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from "../../models/user-data";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    user?: UserData;
    userSubscription: Subscription;

    constructor(private router: Router, private authService: AuthService) {
        this.userSubscription = authService.loggedUser
            .subscribe(user => this.user = user);
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    logOut(): void {
        this.authService.logOut();
        this.router.navigate(['/login']);
    }
}
