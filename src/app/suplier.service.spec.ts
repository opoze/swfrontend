import { TestBed, inject } from '@angular/core/testing';

import { SuplierService } from './suplier.service';

describe('SuplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuplierService]
    });
  });

  it('should be created', inject([SuplierService], (service: SuplierService) => {
    expect(service).toBeTruthy();
  }));
});
