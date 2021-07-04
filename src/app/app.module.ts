import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

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
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/home' }
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
        HomeComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
