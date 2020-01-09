import { LoginComponent } from "./authentication/login/login.component";
import { ConfirmRegistrationComponent } from "./authentication/confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AuthGuard } from "./authentication/auth.guard";
import { MainComponent } from "./main/main.component";
import { RotaDashboardComponent } from './pages/rota/rota-dashboard/rota-dashboard.component'
import { RotaWeekFormComponent } from './pages/rota/rota-week-form/rota-week-form.component';
import { RotaMainFormComponent } from './pages/rota/rota-main-form/rota-main-form.component';
import { RotaListComponent } from './pages/rota/rota-list/rota-list.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthenticationComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegistrationComponent },
      { path: "confirm-register", component: ConfirmRegistrationComponent }
    ]
  },
  { 
    path: "", 
    component: MainComponent, 
    canActivate: [AuthGuard],
    children: [
      { 
        path: "rota", 
        component: RotaDashboardComponent,
        children: [
          {
            path: '',
            component: RotaListComponent,
            outlet: 'rota-shelf-left'
          },
          {
            path: 'view',
            component: RotaListComponent,
            outlet: 'rota-shelf-left'
          },
          {
            path: "edit",
            component: RotaWeekFormComponent,
            outlet: 'rota-grid'
          },
          {
            path: "edit",
            component: RotaMainFormComponent,
            outlet: "rota-shelf-left"
          }
        ]
      }
      //{ Home }
      //{ profile } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
