import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../authentication/auth.service'
import { ViewRotaService } from 'src/app/view-rota.service'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-week-form.component.html',
  styleUrls: ['./rota-week-form.component.scss']
})
export class RotaWeekFormComponent implements OnInit {
  rota = new FormControl({})
  user:any

  constructor(private viewRotaService: ViewRotaService, private auth: AuthService) { 
    this.viewRotaService.selectedRota.valueChanges.subscribe(
      (value:any) => {
        console.log("change")
        console.log(value)
        this.rota.setValue(value)
      }
    )
  }

  ngOnInit() {
    this.rota.setValue(this.viewRotaService.selectedRota.value)
  }

  ngOnChanges() {
    console.log(this.rota.value)
  }
}
