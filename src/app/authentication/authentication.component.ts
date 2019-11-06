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

  // ngAfterViewInit() {
  //   console.log(this.gradientWindow)
  //   const ctx = this.gradientWindow.nativeElement.getContext("2d")
  //   let grd = ctx.createLinearGradient(0,0,200,0)
  //   grd.addColorStop(0,'red')
  //   grd.addColorStop(1,'green')
  //   ctx.fillStyle = grd
  //   ctx.fillRect(10,10,150,80)
  // }

  get formTab() { return this.tabsForm.get('formTab') }
 
}
