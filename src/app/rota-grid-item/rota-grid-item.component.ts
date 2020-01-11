import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rota-grid-item',
  templateUrl: './rota-grid-item.component.html',
  styleUrls: ['./rota-grid-item.component.scss']
})
export class RotaGridItemComponent implements OnInit {
  faCheck = faCheck
  edit = false

  @Input() user:any
  @Input() userData:any
  @Output() insertUser : EventEmitter<any> = new EventEmitter()
  @Output() editTimes: EventEmitter<any> = new EventEmitter()
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target) || this.eRef.nativeElement == event.target || !this.edit) 
      return
    this.edit = false
  }

  timeStart = new FormControl()
  timeEnd = new FormControl()
 
  submitTimes() {
    this.editTimes.emit({ 
      timeStart: this.timeStart.value,
      timeEnd: this.timeEnd.value 
    })
    this.edit = false
  }

  showForm() {
    console.log(this.userData)
    this.edit = true
  }

  closeForm(element) {
    
  }

  constructor(private eRef: ElementRef) { }
  
  ngOnInit() {
    console.log(this.userData)
    if (!this.userData || this.userData.userId != this.user.userId) {
      this.userData = this.user
      this.insertUser.emit(this.user)
    }
    this.timeStart.setValue(this.userData.timeStart)
    this.timeEnd.setValue(this.userData.timeEnd)
  }
}