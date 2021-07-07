import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!this.authService.userData) {
            return next.handle(request);
        }
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.authService.userData.token}`);
        // console.log(headers);
        const req = request.clone({ headers: headers });
        // console.log(req);
        return next.handle(req);
    }
}
