import { Component, OnInit } from '@angular/core';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-rota-dashboard',
  templateUrl: './rota-dashboard.component.html',
  styleUrls: ['./rota-dashboard.component.scss']
})
export class RotaDashboardComponent implements OnInit {
  faCalendarPlus = faCalendarPlus

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newForm() {
    this.router.navigate(['rota/new'])
  }

}
