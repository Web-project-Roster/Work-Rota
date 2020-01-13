import { async } from '@angular/core/testing';
import { WorkRotaSettings } from './../../../interfaces/WorkRotaSettings';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl } from '@angular/forms';
import { WorkRotaService } from './../../../services/work-rota.service';
import { User } from './../../../interfaces/User';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewRotaService } from 'src/app/view-rota.service';

@Component({
  selector: 'app-rota-main-form',
  templateUrl: './rota-main-form.component.html',
  styleUrls: ['./rota-main-form.component.scss']
})
export class RotaMainFormComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  newRotaForm: FormGroup;
  users: User[] = [];
  submitted = false;
  fetchingUser = false;
  newRota: WorkRotaSettings;
  rota = new FormControl({});
  beingEdited = false;
  rotaId = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private rotaService: WorkRotaService,
    private ngxSpinner: NgxSpinnerService,
    private viewRotaService: ViewRotaService
  ) {}

  ngOnInit() {
    if (Object.keys(this.viewRotaService.selectedRotaForEditiing.value).length > 0) {
      const {name, workingHours, users, pk} = this.viewRotaService.selectedRotaForEditiing.value;
      this.rotaId = pk;
      this.addInUsers(users);
      this.beingEdited = true;

      this.newRotaForm = this.fb.group({
        rotaName: [name, Validators.required],
        startTime: [workingHours.split('-')[0], Validators.required],
        endTime: [workingHours.split('-')[1], Validators.required]
      });
    } else {
      this.beingEdited = false;
      this.newRotaForm = this.fb.group({
        rotaName: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      });
    }
  }

  addInUsers(users) {
    users.forEach(u => {
      this.users.push(u);
    });
  }

  toDashboard() {
    this.router.navigate(['rota/list']);
  }

  async getUserByEmail(email: string) {
    if (email !== '') {
      try {
        this.fetchingUser = true;
        const user = await this.userService.searchUserByEmailForNewRota(email);
        this.fetchingUser = false;

        const userIncluded = this.users.some(u => u.userId === user.userId);

        if (!userIncluded) {
            this.users.push(user);
            this.viewRotaService.selectedRota.setValue(this.users);
            this.toastr.info('User added');
            this.fetchingUser = false;
          } else {
            this.toastr.error('User is already added');
            this.fetchingUser = false;
          }
      } catch (err) {
        this.toastr.error('User not found');
        this.fetchingUser = false;
      }
    } else {
      this.toastr.error('You must fill in a value for email to add it');
    }
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
  }

  getWorkingHours(start: string, end: string) {
    return `${start}-${end}`;
  }

  get rotaName() {
    return this.newRotaForm.get('rotaName');
  }

  get startTime() {
    return this.newRotaForm.get('startTime');
  }

  get endTime() {
    return this.newRotaForm.get('endTime');
  }

  async createNewRota() {
    if (this.newRotaForm.invalid) {
      this.submitted = true;
      return;
    }
    const hours = this.getWorkingHours(this.startTime.value, this.endTime.value);
    if (this.beingEdited) {
      this.editRota(hours);
    } else {
      try {
        this.ngxSpinner.show();
        await this.rotaService.createRotaSettings({
          name: this.rotaName.value,
          users: this.users,
          workingHours: hours
        });
        this.toDashboard();
        this.ngxSpinner.hide();
      } catch (err) {
        this.toastr.error(err);
      }
    }
  }

  async editRota(hours) {
    try {
      this.ngxSpinner.show();
      await this.rotaService.updateRotaSettings({
        name: this.rotaName.value,
        users: this.users,
        workingHours: hours,
        pk: this.rotaId
      });
      this.viewRotaService.selectedRotaForEditiing.setValue({});
      this.toDashboard();
      this.ngxSpinner.hide();
    } catch (err) {
      this.toastr.error(err);
    }
  }
}


