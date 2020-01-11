import { TestBed } from '@angular/core/testing';

import { ViewRotaService } from './view-rota.service';

describe('ViewRotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewRotaService = TestBed.get(ViewRotaService);
    expect(service).toBeTruthy();
  });
});
