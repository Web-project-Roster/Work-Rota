import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AuthService } from '../../../authentication/auth.service';
import { ViewRotaService } from 'src/app/view-rota.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-week-form.component.html',
  styleUrls: ['./rota-week-form.component.scss']
})
export class RotaWeekFormComponent implements OnInit {
  rota = new FormControl({});
  showTimesForm = false;

  users: any = [];
  week = {
    days: [
      [
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:01',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:02',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:02',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:03',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:03',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:04',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:04',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:05',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:05',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:06',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:06',
          timeEnd: '17:00'
        }
      ],
      [
        {
          firstName: 'brian',
          surName: 'keaveney',
          userId: 'akdjflka-1983-1kjns',
          timeStart: '09:07',
          timeEnd: '17:00'
        },
        {
          firstName: 'conor',
          surName: 'doherty',
          userId: 'asjfoie-921-1kjnasfasfd',
          timeStart: '09:07',
          timeEnd: '17:00'
        }
      ]
    ],
    manager: {
      firstName: 'brian',
      surName: 'keaveney',
      userId: 'akdjflka-1983-1kjns'
    },
    pk: 'rota#0de6dd43-3ef6-4fe6-a74a-609298e33f33',
    sk: 'week#1',
    workingHours: '9-5'
  };

  constructor(private viewRotaService: ViewRotaService, private eRef: ElementRef) {
    this.viewRotaService.selectedRota.valueChanges.subscribe((value: any) =>  this.rota.setValue(value));
  }

  ngOnInit() {
    this.rota.setValue(this.viewRotaService.selectedRota.value);
  }

  insertUser(user, dayIndex, userIndex) {
    this.week.days[dayIndex].splice(userIndex, 0, user);
  }

  editTimes(workingHours, dayIndex, userIndex) {
    this.week.days[dayIndex][userIndex].timeStart = workingHours.timeStart;
    this.week.days[dayIndex][userIndex].timeEnd = workingHours.timeEnd;
  }
}
