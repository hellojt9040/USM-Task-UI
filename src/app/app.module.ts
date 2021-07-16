import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { LoginComponent } from './common/auth/login/login.component';
import { SignupComponent } from '../app/common/auth/signup/signup.component'
import { ErrorComponent } from './common/error/error.component';
import { SafePipe } from './common/pipes/safe.pipe';


import { AuthInterseptor } from './common/auth/auth-interseptor';
import { ErrorInterceptor } from './error-interceptor';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ReportComponent } from './common/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    SideNavComponent,
    DashboardComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    RouterModule,
    //angular-material module
    AngularMaterialModule,

  ],
  //multi TRUE says not to override, just add additional
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterseptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
