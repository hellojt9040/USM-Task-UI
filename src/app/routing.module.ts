import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './common/not-found/not-found.component';
import { LoginComponent } from './common/auth/login/login.component';
import { SignupComponent } from './common/auth/signup/signup.component';
import { AuthGuard } from './common/auth/auth.guard';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ReportComponent } from './common/report/report.component';
import { UserGuard } from './common/auth/user.guard';

const routes: Routes = [
  {path: '' , redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // {path: 'login', pathMatch: 'full', component: LoginComponent, canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'report', component: ReportComponent, canActivate:[AuthGuard, UserGuard]},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    UserGuard
  ],
  //exports: [RouterModule]
})
export class RoutingModule { }
