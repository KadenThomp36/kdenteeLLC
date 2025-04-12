import { TestBed } from '@angular/core/testing';

import { CoreUtilitiesService } from './core-utilities.service';

describe('CoreUtilitiesService', () => {
  let service: CoreUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
