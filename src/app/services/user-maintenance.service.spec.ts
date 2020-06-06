import { TestBed } from '@angular/core/testing';

import { UserMaintenanceService } from './user-maintenance.service';

describe('UserMaintenanceService', () => {
  let service: UserMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
