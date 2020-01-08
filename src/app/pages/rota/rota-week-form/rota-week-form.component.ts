import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../authentication/auth.service'

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-week-form.component.html',
  styleUrls: ['./rota-week-form.component.scss']
})
export class RotaWeekFormComponent implements OnInit {

  constructor(service: AuthService) { 
    const user = service.currentAuthenticatedUser()
    console.log(user)
  }

  ngOnInit() {
    
  }

}
