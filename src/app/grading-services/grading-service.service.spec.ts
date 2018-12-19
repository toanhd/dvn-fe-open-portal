import { TestBed, inject } from '@angular/core/testing';

import { GradingServicesService } from './grading-service.service';

describe('GradingServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GradingServicesService]
    });
  });

  it('should be created', inject([GradingServicesService], (service: GradingServicesService) => {
    expect(service).toBeTruthy();
  }));
});
