import { UserService } from './../services/user.service';
import { WorkRotaSettings } from './../interfaces/WorkRotaSettings';
import { WorkRotaService } from './../services/work-rota.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;

  constructor(public authService: AuthService,
              private toastr: ToastrService,
              private router: Router ) {
  }

  ngOnInit() {

  }

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['auth/login']);
    } catch (err) {
      this.toastr.error('There was a problem sigining you out');
    }
  }
}
