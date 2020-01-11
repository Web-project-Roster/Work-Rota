import { WorkRotaService } from './../../../services/work-rota.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';
import { ViewRotaService } from 'src/app/view-rota.service';

@Component({
  selector: 'app-rota-list',
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})
export class RotaListComponent implements OnInit {

  constructor(private viewRotaService: ViewRotaService, private auth: AuthService, private router: Router,
              private workRotaService: WorkRotaService) { }
  faCalendarPlus = faCalendarPlus;
  rotas = [];

  // rotas = [ {
  //     id: 1,
  //     name: 'Baxters',
  //     users:  [
  //       {
  //         firstName: 'Brian',
  //         surName: 'keaveney',
  //         userId: 'akdjflka-1983-1kjns'
  //       },
  //       {
  //         firstName: 'Conor',
  //         surName: 'doherty',
  //         userId: 'asjfoie-921-1kjnasfasfd'
  //       }
  //     ],
  //     dayStart: new Date('January 1, 1975 09:00:00'),
  //     dayEnd: new Date('January 1, 1975 17:00:00'),
  //     manager: {
  //       firstName: 'Ronan',
  //       surName: 'McCabe',
  //       userId: 'akdjflka-1983-1kjns'
  //     }
  //   },
  //   {
  //     id: 1,
  //     name: 'Kudos Health',
  //     users:  [
  //       {
  //         firstName: 'Una',
  //         surName: 'LeStrange',
  //         userId: 'akdjflka-1983-1kjns'
  //       },
  //       {
  //         firstName: 'Gabrielle',
  //         surName: 'Mulholland',
  //         userId: 'asjfoie-921-1kjnasfasfd'
  //       }
  //     ],
  //     dayStart: new Date('January 1, 1975 09:00:00'),
  //     dayEnd: new Date('January 1, 1975 17:00:00'),
  //     manager: {
  //       firstName: 'Padraig',
  //       surName: 'Harte',
  //       userId: 'akdjflka-1983-1kjns'
  //     }
  //   },
  //   {
  //     id: 3,
  //     name: 'Campus Connect',
  //     users:  [
  //       {
  //         firstName: 'Charles',
  //         surName: 'McCarthy',
  //         userId: 'akdjflka-1983-1kjns'
  //       },
  //       {
  //         firstName: 'Cathal',
  //         surName: 'McCardle',
  //         userId: 'asjfoie-921-1kjnasfasfd'
  //       }
  //     ],
  //     dayStart: new Date('January 1, 1975 09:00:00'),
  //     dayEnd: new Date('January 1, 1975 17:00:00'),
  //     manager: {
  //       firstName: 'Declan',
  //       surName: 'Sweeney',
  //       userId: 'akdjflka-1983-1kjns'
  //     }
  //   },
  //   {
  //     id: 4,
  //     name: 'Chinese',
  //     users:  [
  //       {
  //         firstName: "Brian",
  //         surName: "keaveney",
  //         userId: "akdjflka-1983-1kjns"
  //       },
  //       {
  //         firstName: "Conor",
  //         surName: "doherty",
  //         userId: "asjfoie-921-1kjnasfasfd"
  //       }
  //     ],
  //     dayStart: new Date('January 1, 1975 09:00:00'),
  //     dayEnd: new Date('January 1, 1975 17:00:00'),
  //     manager: {
  //       firstName: "Ronan",
  //       surName: "McCabe",
  //       userId: "akdjflka-1983-1kjns"
  //     }
  //   },
  //   {
  //     id: 5,
  //     name: 'IT Sligo',
  //     users:  [
  //       {
  //         firstName: "Brian",
  //         surName: "keaveney",
  //         userId: "akdjflka-1983-1kjns"
  //       },
  //       {
  //         firstName: "Conor",
  //         surName: "doherty",
  //         userId: "asjfoie-921-1kjnasfasfd"
  //       }
  //     ],
  //     dayStart: new Date('January 1, 1975 09:00:00'),
  //     dayEnd: new Date('January 1, 1975 17:00:00'),
  //     manager: {
  //       firstName: "Ronan",
  //       surName: "McCabe",
  //       userId: "akdjflka-1983-1kjns"
  //     }
  //   }
  // ]

  NewRota() {
    this.viewRotaService.selectedRota.setValue({});
    this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}]);
  }

  async ngOnInit() {
    this.rotas = await this.workRotaService.getRotasForCurrentUser();
    console.log(this.rotas);
  }
}
