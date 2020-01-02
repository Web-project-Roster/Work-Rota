import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaDashboardComponent } from './rota-dashboard.component';

describe('RotaDashboardComponent', () => {
  let component: RotaDashboardComponent;
  let fixture: ComponentFixture<RotaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
