import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaTileComponent } from './rota-tile.component';

describe('RotaTileComponent', () => {
  let component: RotaTileComponent;
  let fixture: ComponentFixture<RotaTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
