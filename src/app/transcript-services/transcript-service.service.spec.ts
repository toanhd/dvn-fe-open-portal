import { TestBed, inject } from '@angular/core/testing';

import { TranscriptServiceService } from './transcript-service.service';

describe('TranscriptServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranscriptServiceService]
    });
  });

  it('should be created', inject([TranscriptServiceService], (service: TranscriptServiceService) => {
    expect(service).toBeTruthy();
  }));
});
