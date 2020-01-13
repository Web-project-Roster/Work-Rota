import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkRotaSettings } from './interfaces/WorkRotaSettings';

@Injectable({
  providedIn: 'root'
})
export class ViewRotaService {

  constructor() { }

  selectedRota = new FormControl({});
  selectedRotaForEditiing = new FormControl({});
}
