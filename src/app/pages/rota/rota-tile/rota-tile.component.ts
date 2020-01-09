import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewRotaService } from 'src/app/view-rota.service';

@Component({
  selector: 'app-rota-tile',
  templateUrl: './rota-tile.component.html',
  styleUrls: ['./rota-tile.component.scss']
})
export class RotaTileComponent implements OnInit {
  @Input() rota;

  //A click event cannot be assigned to a component directly, so a HostListener must be used instead.
  @HostListener("click") onClick(){
    this.router.navigate(['/rota', { outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'view' }}])
    this.viewRotaService.selectedRota.setValue(this.rota)
  }

  constructor(private viewRotaService: ViewRotaService, private router: Router) { }

  ngOnInit() {
  }

}
