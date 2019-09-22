import { TestBed } from '@angular/core/testing';

import { UnsignedUserAPIService } from './unsigned-user-api.service';

describe('UnsignedUserAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnsignedUserAPIService = TestBed.get(UnsignedUserAPIService);
    expect(service).toBeTruthy();
  });
});
