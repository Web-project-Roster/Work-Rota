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
  faCalendarPlus = faCalendarPlus;
  rotas = [];
  loadingRotas = false;

  constructor(private viewRotaService: ViewRotaService, private auth: AuthService, private router: Router,
              private workRotaService: WorkRotaService) { }


  NewRota() {
    this.viewRotaService.selectedRota.setValue({});
    this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}]);
  }

  async ngOnInit() {
    this.loadingRotas = true;
    this.rotas = await this.workRotaService.getRotasForCurrentUser();
    this.loadingRotas = false;
    console.log(this.rotas);
  }
}
