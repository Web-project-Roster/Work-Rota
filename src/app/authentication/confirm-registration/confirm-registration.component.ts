import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  email = environment.confirm.email;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.email) {
      this.router.navigate(['register']);
    } else {
      Auth.resendSignUp(this.email);
    }
  }

}
