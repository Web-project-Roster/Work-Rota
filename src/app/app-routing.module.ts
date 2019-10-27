import { LoginComponent } from "./authentication/login/login.component";
import { ConfirmRegistrationComponent } from "./authentication/confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AuthGuard } from "./authentication/auth.guard";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {
    path: "auth",
    component: AuthenticationComponent,
    children: [
      { path: "register", component: RegistrationComponent },
      { path: "confirm-register", component: ConfirmRegistrationComponent },
      { path: "login", component: LoginComponent }
    ]
  },
  { path: "", component: MainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
