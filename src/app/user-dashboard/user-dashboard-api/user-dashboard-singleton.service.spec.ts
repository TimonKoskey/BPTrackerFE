import { TestBed } from '@angular/core/testing';

import { UserDashboardSingletonService } from './user-dashboard-singleton.service';

describe('UserDashboardSingletonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDashboardSingletonService = TestBed.get(UserDashboardSingletonService);
    expect(service).toBeTruthy();
  });
});
