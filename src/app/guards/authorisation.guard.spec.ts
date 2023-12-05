import { TestBed } from '@angular/core/testing';

import { AuthorisationGuard } from './authorisation.guard';

describe('AuthorisationGuard', () => {
  let guard: AuthorisationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorisationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
