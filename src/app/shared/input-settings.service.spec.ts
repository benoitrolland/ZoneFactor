import { TestBed, inject } from '@angular/core/testing';

import { InputSettingsService } from './input-settings.service';

describe('InputSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputSettingsService]
    });
  });

  it('should be created', inject([InputSettingsService], (service: InputSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
