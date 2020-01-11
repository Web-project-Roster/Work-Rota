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
              private router: Router,
              private workRotaService: WorkRotaService,
              private userService: UserService ) {
  }

  ngOnInit() {

  }

  async createRota() {
    // const rota: WorkRotaSettings = {
    //   pk: 'rota#2cc40336-e83c-48e7-acd6-b440729c018c',
    //   sk: 'rota#2cc40336-e83c-48e7-acd6-b440729c018c',
    //   manager: {
    //     email: 'briankeaveney@hotmail.com',
    //     fname: 'brian',
    //     lname: 'keaveney'
    //   },
    //   name: 'test6 rota',
    //   users: [
    //     {
    //       fname: 'Stephen',
    //       lname: 'Keaveney',
    //       userId: '4bd601ce-0c0e-46d0-9217-17dccf4fab26'
    //     },
    //     {
    //       fname: 'Stephen',
    //       lname: 'Keaveney',
    //       userId: '4bd601ce-0c0e-46d0-9217-17dccf4fab26'
    //     },
    //   ],
    //   workingHours: '9-4'
    // };

    // const rota: WorkRotaSettings = {
    //   name: 'first rota',
    //   workingHours: '9-5',
    //   users: [
    //     {
    //       fname: 'brian',
    //       lname: 'keaveney',
    //       userId: '4bd601ce-0c0e-46d0-9217-17dccf4fab26'
    //     }
    //   ]
    // };
    try {
      // await this.workRotaService.createRotaSettings(rota);
      // const result = await this.workRotaService.getRotasForCurrentUser();
      // console.log(result);
        // await this.workRotaService.updateRotaSettings(rota);
        // const rotas = await this.workRotaService.getRotasForCurrentUser();
        // const user = await this.userService.searchUserByEmail('briankeaveney@hotmail.com', 'rota#2cc40336-e83c-48e7-acd6-b440729c018c');
        // console.log(user);

    } catch (err) {
      console.log(err);
    }

    // this.workRotaService.getRotasForCurrentUser().subscribe(
    //   (val) => {
    //     console.log(val);
    //   }
    // );
    console.log('finished request');
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
