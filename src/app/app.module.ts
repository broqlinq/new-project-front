import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        LoginComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
