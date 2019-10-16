import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
