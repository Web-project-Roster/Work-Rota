import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onLogin() {
    try {
      await this.authService.signIn(this.email.value, this.password.value);
      this.router.navigate(["rota/list"]);
    } catch (err) {
      this.toastr.error(err.message);
      console.log(err.message);
      if (err.message === 'User is not confirmed.') {
        environment.userInfo.password = this.password.value;
        environment.userInfo.email = this.email.value;
        this.router.navigate(['auth/confirm-register']);
      }
    }
  }
}
