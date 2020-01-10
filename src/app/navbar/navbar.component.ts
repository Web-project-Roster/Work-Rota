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
              private router: Router,
              private workRotaService: WorkRotaService ) {
  }

  ngOnInit() {

  }

  async createRota() {
    const rota: WorkRotaSettings = {
      name: 'test5 rota',
      manager: {
        fname: 'Brian',
        lname: 'Keaveney',
        userId: '4bd601ce-0c0e-46d0-9217-17dccf4fab26'
      },
      users: [
        {
          fname: 'Brian',
          lname: 'Keaveney',
          userId: '4bd601ce-0c0e-46d0-9217-17dccf4fab26'
        }
      ],
      workingHours: '9-5'
    };
    await this.workRotaService.createRotaSettings(rota);

    // this.workRotaService.getRotasForCurrentUser().subscribe(
    //   (val) => {
    //     console.log(val);
    //   }
    // );
    console.log(await this.authService.currentAuthenticatedUser());
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
