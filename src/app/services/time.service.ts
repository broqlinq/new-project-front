import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    private readonly _dateSubject: BehaviorSubject<number>;

    get dateSubject(): BehaviorSubject<number> {
        return this._dateSubject;
    }

    constructor() {
        this._dateSubject = new BehaviorSubject<number>(Date.now());
        setInterval(() => this.dateSubject.next(Date.now()));
    }
}
