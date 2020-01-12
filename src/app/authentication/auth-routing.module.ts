import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'confirm-register', component: ConfirmRegistrationComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(authRoutes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
