import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { Router } from '@angular/router';
import { ViewRotaService } from 'src/app/view-rota.service';

@Component({
  selector: 'app-rota-tile',
  templateUrl: './rota-tile.component.html',
  styleUrls: ['./rota-tile.component.scss'],
  animations: [
    trigger('clickTile', [
      state('unset', style({})),
      state('right', style({
        transform: 'translatex(20px)'
      })),
      state('up', style({
        transform: 'translatey(10px)'
      })),
      transition('unset => right', animate('400ms ease-out')),
      transition('right => unset', animate('400ms ease-out')),
      transition('unset => up', animate('400ms ease-out')),
      transition('up => unset', animate('400ms ease-out'))
    ])
  ]
})
export class RotaTileComponent implements OnInit {
  @Input() rota;
  isSelected = false

  //A click event cannot be assigned to a component directly, so a HostListener must be used instead.
  @HostListener("click") onClick(){
    this.router.navigate(['rota/list', { outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'view' }}])
    this.viewRotaService.selectedRota.setValue(this.rota)
  }

  constructor(private viewRotaService: ViewRotaService, private router: Router) {
    this.viewRotaService.selectedRota.valueChanges.subscribe((value:any) =>  {
      value.sk == this.rota.sk ? this.isSelected = true : this.isSelected = false
    })
   }

  ngOnInit() {
    
  }

  get getState() {
    if (window.screen.width > 990)
      return this.isSelected ? 'right' : 'unset'
    return this.isSelected ? 'up' : 'unset'
  }
}
