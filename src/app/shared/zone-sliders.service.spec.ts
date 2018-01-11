import { TestBed, inject } from '@angular/core/testing';

import { ZoneSlidersService } from './zone-sliders.service';

describe('ZoneSlidersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoneSlidersService]
    });
  });

  it('should be created', inject([ZoneSlidersService], (service: ZoneSlidersService) => {
    expect(service).toBeTruthy();
  }));
});
