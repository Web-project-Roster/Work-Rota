import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/authentication/auth.service';
import { CognitoUser } from "amazon-cognito-identity-js";
import { Http, Headers } from "@angular/http";
import { Router } from '@angular/router';
import { ViewRotaService } from 'src/app/view-rota.service';

@Component({
  selector: 'app-rota-list',
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})
export class RotaListComponent implements OnInit {
  faCalendarPlus = faCalendarPlus

  constructor(private viewRotaService: ViewRotaService, private auth: AuthService, private http: Http, private router: Router) { }

  NewRota() {
    this.viewRotaService.selectedRota.setValue({})
    this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}])
  }

  rotas = [ {
      id: 1,
      name: 'Baxters',
      users:  [
        {
          firstName: "Brian",
          surName: "keaveney",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstName: "Conor",
          surName: "doherty",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00'),
      manager: {
        firstName: "Ronan",
        surName: "McCabe",
        userId: "akdjflka-1983-1kjns"
      }
    }, 
    {
      id: 1,
      name: 'Kudos Health',
      users:  [
        {
          firstName: "Una",
          surName: "LeStrange",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstName: "Gabrielle",
          surName: "Mulholland",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00'),
      manager: {
        firstName: "Padraig",
        surName: "Harte",
        userId: "akdjflka-1983-1kjns"
      }
    }, 
    {
      id: 3,
      name: 'Campus Connect',
      users:  [
        {
          firstName: "Charles",
          surName: "McCarthy",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstName: "Cathal",
          surName: "McCardle",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00'),
      manager: {
        firstName: "Declan",
        surName: "Sweeney",
        userId: "akdjflka-1983-1kjns"
      }
    } 
  ]

  ngOnInit() {
    const context = this;
    var user = this.auth.currentAuthenticatedUser().then(function(u) {
      //Man never keeps his promises >:)
      u.getSession((err, session) => {
        if (err) return
        
        const token = session.getIdToken().getJwtToken()

        const header = new Headers()
        header.append('Authorization', token)

        context.http.get('http://localhost:3000/rotas').subscribe(
          response => {
            console.log(response.json())
          },
          error => {
            console.log(error);
          }
        )
      })
    });
  }

  

}
