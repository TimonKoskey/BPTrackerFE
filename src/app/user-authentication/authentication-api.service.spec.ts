import { TestBed } from '@angular/core/testing';

import { AuthenticationAPIService } from './authentication-api.service';

describe('AuthenticationAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationAPIService = TestBed.get(AuthenticationAPIService);
    expect(service).toBeTruthy();
  });
});
