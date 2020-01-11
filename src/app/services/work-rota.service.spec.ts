import { TestBed } from '@angular/core/testing';

import { WorkRotaService } from './work-rota.service';

describe('WorkRotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkRotaService = TestBed.get(WorkRotaService);
    expect(service).toBeTruthy();
  });
});
