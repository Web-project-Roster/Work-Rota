import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { debounceTime } from 'rxjs/operators';
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
  submitted = false;
  passwordValid = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern('[a-z,A-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern('[a-z,A-Z]*')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkPasswordsMatch});
  }

  checkPasswordsMatch(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
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

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }



  async onSignUp() {
    // try {
    //   await this.authService.signUp({
    //     email: this.email.value,
    //     password: this.password.value,
    //     firstName: this.firstName.value,
    //     lastName: this.lastName.value
    //   });

    //   environment.userInfo.password = this.password.value;
    //   this.router.navigate(['auth/confirm-register']);
    // } catch (err) {
    //   this.toastr.error(err.message);
    // }
  }
}
