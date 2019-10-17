import { LoginComponent } from './authentication/login/login.component';
import { ConfirmRegistrationComponent } from './authentication/confirm-registration/confirm-registration.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'auth/confirm', component: ConfirmRegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
