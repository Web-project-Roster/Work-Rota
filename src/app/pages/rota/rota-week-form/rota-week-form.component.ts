import { User } from './../../../interfaces/User';
import { Component, OnInit, ElementRef } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ViewRotaService } from 'src/app/view-rota.service';
import { FormControl } from '@angular/forms';
import { WorkRotaService } from 'src/app/services/work-rota.service';
import { WorkRotaWeek, NewRotaWeek } from 'src/app/interfaces/WorkRotaWeek';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-week-form.component.html',
  styleUrls: ['./rota-week-form.component.scss'],
  animations: [
    trigger('openUserWeek', [
      state('hide', style({})),
      state('show', style({
        height: '80px',
        borderBottom: '1px solid #2A00AA',
        overflow: 'visible'
      })),
      transition('hide => show', animate('500ms ease-out')),
      transition('show => hide', animate('200ms ease-out'))
    ])
  ]
})
export class RotaWeekFormComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  rota = new FormControl({});
  weeks = new FormControl([{}]);
  weekIndex = new FormControl();
  isManager = new FormControl(false);
  manager: User;
  allWeeksForRota: WorkRotaWeek[] = [];

  mobileShelfOpen: boolean[] = [];
  weekDayNames = [];

  constructor(
    private viewRotaService: ViewRotaService,
    private eRef: ElementRef,
    private workRotaService: WorkRotaService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService) {
      this.viewRotaService.selectedRota.valueChanges.subscribe((value: any) =>  {
        // const context = this;
        const sk = value.sk;
        this.weeks.setValue([]);
        this.rota.setValue(value);
        this.getRota(sk);

        // short wait to ensure the rota is pulled in

        this.getWeeks(sk);
    });
  }

  ngOnInit() {
    this.weekIndex.setValue(this.weeks.value.length - 1 || 0);
    this.weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
    this.rota.setValue(this.viewRotaService.selectedRota.value);
  }

  async getRota(sk: string) {
    if (sk !== undefined && sk !== '') {
      this.rota.setValue(await this.workRotaService.getRotaSettings(sk));

    }
  }

  async getCurrentRotaInfo() {

  }

  // SPINNER HERE IN THIS METHOD ---------------------------------------------------------------------------------------------------
  async getWeeks(sk: string) {
    if (sk !== undefined && sk !== '') {
      this.allWeeksForRota = await this.workRotaService.getAllRotaWeeks(sk);
      const user = await this.auth.currentAuthenticatedUser();
      const userName = user.getUsername();
      this.manager = this.allWeeksForRota[0].manager;
      const managerId = this.allWeeksForRota[0].manager.userId;

      if (managerId === userName) {
        this.isManager.setValue(true);
      } else {
        this.isManager.setValue(false);
      }
      this.weeks.setValue(this.allWeeksForRota);
      this.mobileShelfOpen = this.rota.value.users.map(m => false);
      this.weekIndex.setValue(this.weeks.value.length - 1);
    }
  }

  async nextWeek() {
    if (this.weeks.value && this.weeks.value[this.weekIndex.value + 1]) {
      return this.weekIndex.setValue(this.weekIndex.value + 1);
    }

    if (this.isManager) {
      const rotaWeek: NewRotaWeek = {
        pk: this.rota.value.sk,
        weekNo: (this.weekIndex.value + 1) || 0
      };

      await this.workRotaService.generateRotaWeek(rotaWeek);

      this.getWeeks(this.rota.value.sk);

      return this.toastr.success('You have just created a new week');
    }
  }

  lastWeek() {
    if (this.weekIndex.value !== 0) {
      this.weekIndex.setValue(this.weekIndex.value - 1);
    }
  }

  insertUser(user, dayIndex, userIndex) {
    this.weeks.value[this.weekIndex.value].days[dayIndex].splice(userIndex, 0, user);
  }

  async editTimes({timeStart, timeEnd, user}, dayIndex, userIndex) {
    const updatedUser = {
      hours: `${timeStart}-${timeEnd}`,
      ...user
    };
    const days = this.allWeeksForRota[this.weekIndex.value].days;
    const dayForChecking = days[dayIndex];
    const updatedDay = this.checkIfUserExistsInDay(updatedUser, dayForChecking);
    days.splice(dayIndex, 1, updatedDay);

    const weekNo = this.weekIndex.value === 0 ? this.weekIndex.value + 1 : this.weekIndex.value;

    const week: WorkRotaWeek = {
      pk: this.rota.value.sk,
      days,
      manager: this.manager,
      sk: `week#${weekNo}`
    };

    try {
      await this.workRotaService.updateRotaWeek(week);
    } catch (err) {
      this.toastr.error(err.message);
    }
  }

  checkIfUserExistsInDay(user, day) {
    for ( let i = 0; i < day.length; i++) {
      if (day[i].userId === user.userId) {
        day.splice(i, 1, user);
      }
    }
    return day;
  }

  dropDown(userIndex, user) {
    if (window.screen.width <= 576) {
      this.mobileShelfOpen[userIndex] = !this.mobileShelfOpen[userIndex];
    }
  }

  isOpen(index) {
    return this.mobileShelfOpen[index] ? 'show' : 'hide';
  }

  editRotaSettings() {
    if (this.isManager) {
      this.router.navigate(['rota/list', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}]);
    }
  }

  get rotaIsEmpty() {
    return Object.entries(this.rota.value).length !== 0;
  }
}
