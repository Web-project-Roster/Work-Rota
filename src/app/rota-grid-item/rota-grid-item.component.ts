import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rota-grid-item',
  templateUrl: './rota-grid-item.component.html',
  styleUrls: ['./rota-grid-item.component.scss']
})
export class RotaGridItemComponent implements OnInit {

  constructor(private eRef: ElementRef) { }
  faCheck = faCheck;
  edit = false;

  @Input() isManager;
  @Input() user: any;
  @Input() userData: any;
  @Output() insertUser: EventEmitter<any> = new EventEmitter();
  @Output() editTimes: EventEmitter<any> = new EventEmitter();

  timeStart = new FormControl();
  timeEnd = new FormControl();
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target) || this.eRef.nativeElement === event.target || !this.edit) {
      return;
    }
    this.edit = false;
  }

  submitTimes() {
    if (this.isManager) {
      this.editTimes.emit({
        timeStart: this.timeStart.value,
        timeEnd: this.timeEnd.value,
        user: this.user
      });
      this.edit = false;
    } else {
      console.log('not Manager');
    }
  }

  showForm() {
    if (this.isManager) {
      this.edit = true;
    }
  }

  ngOnInit() {
    // console.log(this.userData);
    if (!this.userData || this.userData.userId !== this.user.userId) {
      this.userData = {
        firstName: this.user.fname,
        lastName: this.user.lname
      };
      this.insertUser.emit(this.user);
    }
    if (this.userData.hours) {
      this.timeStart.setValue(this.userData.hours.split('-')[0]);
      this.timeEnd.setValue(this.userData.hours.split('-')[1]);
    }
  }
}
