import { Component } from '@angular/core';
import { AlertService } from "./services/alert.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'air-company';

    constructor(private alertService: AlertService) {
    }

    alert() {
        this.alertService.success("Successful!")
    }
}
