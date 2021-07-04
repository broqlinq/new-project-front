import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertType } from "../../models/alert";
import { Subscription } from "rxjs";
import { NavigationStart, Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id: string = 'default-alert';
    @Input() fade: boolean = true;

    alerts: Alert[] = [];
    alertSubscription?: Subscription;
    routeSubscription?: Subscription;

    constructor(private router: Router, private alertService: AlertService) {}

    ngOnInit(): void {
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    this.alerts = this.alerts.filter(al => al.keepAfterRouteChange);
                    this.alerts.forEach(al => delete al.keepAfterRouteChange);
                    return;
                }

                this.alerts.push(alert);

                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3500);
                }
            })

        this.routeSubscription = this.router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        })
    }

    ngOnDestroy(): void {
        this.alertSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
    }

    removeAlert(alert: Alert) {
        if (!this.alerts.includes(alert)) {
            return;
        }

        if (this.fade) {
            alert.fade = true;

            setTimeout(() => {
                this.alerts = this.alerts.filter(al => al !== alert);
            }, 250);
        } else {
            this.alerts = this.alerts.filter(al => al !== alert);
        }
    }

    cssClass(alert: Alert): string {
        if (!alert)
            return '';

        const classes: string[] = ['alert', 'alert-dismissible', 'mt-4', 'container'];

        const alertTypeClasses = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Warning]: 'alert alert-warning',
            [AlertType.Info]: 'alert alert-info',
        }

        // @ts-ignore
        classes.push(alertTypeClasses[alert.type])

        if (alert.fade) {
            classes.push('fade')
        }

        return classes.join(' ');
    }

}
