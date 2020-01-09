import { Component, OnInit } from '@angular/core';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/authentication/auth.service';
import { CognitoUser } from "amazon-cognito-identity-js";
import { Http, Headers } from "@angular/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-rota-list',
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})
export class RotaListComponent implements OnInit {
  faCalendarPlus = faCalendarPlus

  constructor(private auth: AuthService, private http: Http, private router: Router) { }

  rotas = [ {
      name: 'Baxters',
      users:  [
        {
          firstname: "brian",
          surName: "keaveney",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstname: "conor",
          surName: "doherty",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00')
    }, 
    {
      name: 'Kudos Health',
      users:  [
        {
          firstname: "Una",
          surName: "LeStrange",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstname: "Gabrielle",
          surName: "Mulholland",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00')
    }, 
    {
      name: 'Campus Connect',
      users:  [
        {
          firstname: "Una",
          surName: "LeStrange",
          userId: "akdjflka-1983-1kjns"
        },
        {
          firstname: "Gabrielle",
          surName: "Mulholland",
          userId: "asjfoie-921-1kjnasfasfd"
        }
      ],
      dayStart: new Date('January 1, 1975 09:00:00'),
      dayEnd: new Date('January 1, 1975 17:00:00')
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

  newRota() {
    this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}])
  }

}
