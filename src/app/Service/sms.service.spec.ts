import { TestBed } from '@angular/core/testing';

import { SMSService } from './sms.service';

describe('SMSService', () => {
  let service: SMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
