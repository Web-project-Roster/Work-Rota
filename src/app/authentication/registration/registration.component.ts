import { environment } from './../../../environments/environment';
import { AuthService } from '../auth.service';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Person } from './../models/person';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {

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

  // get phoneNum() {
  //   return this.registrationForm.get('phoneNum');
  // }

  async onSignUp() {
    try {
      await this.authService.signUp({
        email: this.email.value,
        password: this.password.value
      });

      environment.confirm.email = this.email.value;
      environment.confirm.password = this.password.value;
    } catch (err) {
      console.log(err);
    }
  }
}
