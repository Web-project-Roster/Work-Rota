import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaWeekFormComponent } from './rota-week-form.component';

describe('RotaFormComponent', () => {
  let component: RotaWeekFormComponent;
  let fixture: ComponentFixture<RotaWeekFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaWeekFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaWeekFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
