import { TestBed } from '@angular/core/testing';

import { AuthorisationUserGuard } from './authorisation-user.guard';

describe('AuthorisationUserGuard', () => {
  let guard: AuthorisationUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorisationUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
