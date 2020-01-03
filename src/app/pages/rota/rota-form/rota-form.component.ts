import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../authentication/auth.service'

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-form.component.html',
  styleUrls: ['./rota-form.component.scss']
})
export class RotaFormComponent implements OnInit {

  constructor(service: AuthService) { 
    const user = service.currentAuthenticatedUser()
    console.log(user)
  }

  ngOnInit() {
    
  }

}
