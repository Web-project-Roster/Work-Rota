import { Component, OnInit } from '@angular/core';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rota-list',
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})
export class RotaListComponent implements OnInit {
  faCalendarPlus = faCalendarPlus

  constructor() { }

  ngOnInit() {
  }

}
