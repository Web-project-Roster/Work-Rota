import { AmplifyService }  from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor(private authService: AmplifyService, private router: Router) {
    this.authService.authState().subscribe(authState => {
      this.isUserAllowedHere(authState);
    });
   }

  ngOnInit() { }

  isUserAllowedHere({ state }) {
    if (state !== 'confirmSignUp') {
      this.router.navigate(['register']);
    }
  }

}
