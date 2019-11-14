import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  // @ViewChild('gradientBackground', {static: false}) gradientWindow: ElementRef;

  tabsForm = new FormGroup({
    formTab: new FormControl()
  });

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.formTab.valueChanges.subscribe(
      (value: any) => { this.router.navigate(['auth/' + value]) }
    )
  }

  ngOnInit() {
    this.tabsForm.setValue({formTab: 'login'})
  }

  get formTab() { return this.tabsForm.get('formTab') }
 
}
