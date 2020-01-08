import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rota-main-form',
  templateUrl: './rota-main-form.component.html',
  styleUrls: ['./rota-main-form.component.scss']
})
export class RotaMainFormComponent implements OnInit {
  faArrowLeft = faArrowLeft

  toDashboard() {
    this.router.navigate(["rota"]);
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
