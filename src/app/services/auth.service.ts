import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { UserData, UserType } from "../models/user-data";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { UserForm } from "../models/user-form";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly authUrl: string = 'http://localhost:8080/auth'
    private readonly registerUrl: string = 'http://localhost:8080/user/register'
    private readonly updateUrl: string = 'http://localhost:8080/user'

    private readonly userSubject: BehaviorSubject<UserData>;
    readonly loggedUser: Observable<UserData>;

    constructor(private http: HttpClient, private router: Router) {
        const userData: string = <string>localStorage.getItem('user');
        this.userSubject = new BehaviorSubject<UserData>(JSON.parse(userData))
        this.loggedUser = this.userSubject.asObservable();
    }

    public get userData(): UserData { return this.userSubject.getValue() }

    register(username: string, password: string, type: UserType): Observable<UserForm> {
        const userForm: UserForm = { username, password, type };
        return this.http.post<UserForm>(this.registerUrl, userForm);
    }

    isAdmin(): boolean {
        let type = UserType[UserType.ADMIN];
        return this.userData.type.toString() === type;
    }

    update(username: string, password: string, type: UserType): Observable<UserForm> {
        const userForm: UserForm = { username, password, type };
        return this.http.put<UserForm>(this.updateUrl, userForm);
    }

    logIn(username: string, password: string): Observable<UserData> {
        const credentials = { username, password };
        return this.http.post<UserData>(this.authUrl, credentials)
            .pipe(map(user => {
                let userJson = JSON.stringify(user);
                localStorage.setItem('user', userJson);
                this.userSubject.next(user);
                return user;
            }));
    }

    logOut(): void {
        localStorage.removeItem('user');
        // @ts-ignore
        this.userSubject.next(null);
        this.router.navigate(['']);
    }
}
