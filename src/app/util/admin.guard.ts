import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean |
        UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {

        const user = this.authService.userData;

        if (user && this.authService.isAdmin()) {
            return true;
        }

        this.router.navigate(['home'])
            .then(() => this.alertService.error('Unauthorized access: Page requires administrator privileges', { autoClose: true }))
        return false;
    }

}
