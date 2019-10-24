import { environment } from './../../../environments/environment';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      password: ['']
    });
  }


  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  async onSignUp() {
    try {
      await this.authService.signUp({
        email: this.email.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value
      });
      
      this.router.navigate(['confirm-register']);
    } catch (err) {
      this.toastr.error(err.message);
    }
  }
}
