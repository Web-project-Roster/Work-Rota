import { LoginComponent } from "./authentication/login/login.component";
import { ConfirmRegistrationComponent } from "./authentication/confirm-registration/confirm-registration.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./authentication/profile/profile.component";

const routes: Routes = [
  { path: "", component: RegistrationComponent },
  { path: "register", component: RegistrationComponent },
  { path: "confirm-register", component: ConfirmRegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
