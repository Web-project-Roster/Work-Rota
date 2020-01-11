import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaMainFormComponent } from './rota-main-form.component';

describe('RotaMainFormComponent', () => {
  let component: RotaMainFormComponent;
  let fixture: ComponentFixture<RotaMainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaMainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
