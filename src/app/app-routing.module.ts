import { LoginComponent } from "./authentication/login/login.component";
import { ConfirmRegistrationComponent } from "./authentication/confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AuthGuard } from "./authentication/auth.guard";
import { MainComponent } from "./main/main.component";
import { RotaDashboardComponent } from './pages/rota/rota-dashboard/rota-dashboard.component'
import { RotaFormComponent } from './pages/rota/rota-form/rota-form.component';

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
            path: "new",
            component: RotaFormComponent
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
