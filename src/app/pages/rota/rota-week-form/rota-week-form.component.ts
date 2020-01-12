import { Component, OnInit, ElementRef } from '@angular/core'
import {trigger, state, style, transition, animate} from '@angular/animations';
import { faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ViewRotaService } from 'src/app/view-rota.service'
import { FormControl } from '@angular/forms';
import { WorkRotaService } from 'src/app/services/work-rota.service';
import { WorkRotaWeek, NewRotaWeek } from 'src/app/interfaces/WorkRotaWeek';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

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
  faArrowDown = faArrowDown
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight

  rota = new FormControl({})
  weeks = new FormControl([{}])
  weekIndex = new FormControl()
  isManager = new FormControl(false)
  
  mobileShelfOpen = []
  weekDayNames = []

  constructor(private viewRotaService: ViewRotaService, private eRef: ElementRef, private workRotaService: WorkRotaService, private router: Router, private auth: AuthService) { 
    this.viewRotaService.selectedRota.valueChanges.subscribe((value:any) =>  {
      const context = this
      const sk = value.sk
      context.weeks.setValue([])
      context.rota.setValue(value)
      context.getRota()

      //short wait to ensure the rota is pulled in

      context.getWeeks(sk)
      
      
      
    })
  }

  ngOnInit() {
    this.weekIndex.setValue(this.weeks.value.length -1 || 0)
    this.weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]
    this.rota.setValue(this.viewRotaService.selectedRota.value)
  }

  async getRota() {
    this.rota.setValue(await this.workRotaService.getRotaSettings(this.rota.value.sk))
  }

  //SPINNER HERE IN THIS METHOD ---------------------------------------------------------------------------------------------------
  async getWeeks(sk:string) {
    const context = this
    setTimeout(async function () {
      context.auth.currentAuthenticatedUser().then(function(u) {
        if (context.rota.value.manager.userId == u.username)
          context.isManager.setValue(true)
        else 
          context.isManager.setValue(false)
      })
      context.weeks.setValue(await context.workRotaService.getAllRotaWeeks(context.rota.value.sk))
      context.mobileShelfOpen = context.rota.value.users.map(m => false)
      context.weekIndex.setValue(context.weeks.value.length -1)
  }, 700);
  }

  async nextWeek() {
    if (this.weeks.value && this.weeks.value[this.weekIndex.value + 1])
      return this.weekIndex.setValue(this.weekIndex.value + 1)
    
    let rotaWeek:NewRotaWeek = {
      pk: this.rota.value.sk,
      weekNo: (this.weekIndex.value + 1) || 0
    }

    await this.workRotaService.generateRotaWeek(rotaWeek)

    this.getWeeks(this.rota.value.sk)
  }

  lastWeek() {
    if (this.weekIndex.value != 0)
      this.weekIndex.setValue(this.weekIndex.value -1)
  }

  insertUser(user, dayIndex, userIndex) {
    this.weeks.value[this.weekIndex.value].days[dayIndex].splice(userIndex, 0, user);
  }

  // editTimes(workingHours, dayIndex, userIndex) {
  //   this.week.days[dayIndex][userIndex].timeStart = workingHours.timeStart;
  //   this.week.days[dayIndex][userIndex].timeEnd = workingHours.timeEnd;
  // }

  dropDown(userIndex, user) {
    if (window.screen.width <= 576)
      this.mobileShelfOpen[userIndex] = !this.mobileShelfOpen[userIndex]
  }

  isOpen(index) {
    return this.mobileShelfOpen[index] ? 'show' : 'hide'
  }

  editRotaSettings() {
    if (this.isManager)
      this.router.navigate(['/rota', {outlets: {'rota-grid': 'edit', 'rota-shelf-left': 'edit' }}]);
  }

  get rotaIsEmpty() {
    return Object.entries(this.rota.value).length != 0
  }
}
