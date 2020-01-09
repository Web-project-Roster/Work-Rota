import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rota-tile',
  templateUrl: './rota-tile.component.html',
  styleUrls: ['./rota-tile.component.scss']
})
export class RotaTileComponent implements OnInit {
  @Input() rota: {};
  
  //A click event cannot be assigned to a component directly, so a HostListener must be used instead.
  @HostListener("click") onClick(){
    this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'view' }}])
  }

  constructor(private router: Router) { }



  ngOnInit() {
  }

}
