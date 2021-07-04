import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeService } from "../services/time.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
    private _subscription?: Subscription;

    constructor(private timeService: TimeService) {
    }

    private _currentTime: number = Date.now();

    get currentTime(): number {
        return this._currentTime;
    }

    set currentTime(value: number) {
        this._currentTime = value;
    }

    ngOnInit(): void {
        this._subscription = this.timeService.dateSubject
            .subscribe(time => this.currentTime = time);
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }
}
