import { TestBed } from '@angular/core/testing';

import { EventServicesService } from './event-services.service';

describe('EventServicesService', () => {
  let service: EventServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
