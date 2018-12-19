import { TestBed, inject } from '@angular/core/testing';

import { LecturerServiceService } from './lecturer-service.service';

describe('LecturerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LecturerServiceService]
    });
  });

  it('should be created', inject([LecturerServiceService], (service: LecturerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
