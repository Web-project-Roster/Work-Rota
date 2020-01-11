import { NgxSpinnerService } from 'ngx-spinner';
import { Validators } from '@angular/forms';
import { WorkRotaService } from './../../../services/work-rota.service';
import { User } from './../../../interfaces/User';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private rotaService: WorkRotaService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.newRotaForm = this.fb.group({
      rotaName: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  toDashboard() {
    this.router.navigate(['rota']);
  }

  async getUserByEmail(email: string) {
    this.fetchingUser = true;
    const user = await this.userService.searchUserByEmailForNewRota(email);
    this.fetchingUser = false;

    if (!user) {
      this.toastr.error('User not found');
    } else {
      const userIncluded = this.users.some(u => u.userId === user.userId);

      if (!userIncluded) {
        this.users.push(user);
        this.toastr.info('User added');
      } else {
        this.toastr.error('User is already added');
      }
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

    this.submitted = true;

  }

}
