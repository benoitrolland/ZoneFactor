import { TestBed, inject } from '@angular/core/testing';

import { ImpressService } from './impress.service';

describe('ImpressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpressService]
    });
  });

  it('should be created', inject([ImpressService], (service: ImpressService) => {
    expect(service).toBeTruthy();
  }));
});
