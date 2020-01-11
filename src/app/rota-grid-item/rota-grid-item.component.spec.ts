import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaGridItemComponent } from './rota-grid-item.component';

describe('RotaGridItemComponent', () => {
  let component: RotaGridItemComponent;
  let fixture: ComponentFixture<RotaGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
