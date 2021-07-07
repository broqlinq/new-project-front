import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TicketTableComponent } from './components/ticket-table/ticket-table.component';
import { AuthGuard } from "./util/auth.guard";
import { HeaderComponent } from './components/header/header.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TicketFilterComponent } from './components/home/ticket-filter/ticket-filter.component';
import { HomeComponent } from "./components/home/home.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { UserFormComponent } from './components/home/user-form/user-form.component';
import { MatTabsModule } from "@angular/material/tabs";
import { TicketFormComponent } from './components/home/ticket-form/ticket-form.component';
import { MatIconModule } from "@angular/material/icon";
import { ErrorInterceptor } from "./util/error.interceptor";
import { RequestInterceptor } from "./util/request.interceptor";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        LoginComponent,
        AlertComponent,
        TicketTableComponent,
        HeaderComponent,
        TicketsComponent,
        NotFoundComponent,
        TicketFilterComponent,
        HomeComponent,
        UserFormComponent,
        TicketFormComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule,
        MatIconModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
