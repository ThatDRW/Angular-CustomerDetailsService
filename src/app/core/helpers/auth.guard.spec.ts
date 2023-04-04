import { authGuard } from './auth.guard';

describe('Auth', () => {
  it('should create an instance', () => {
    expect(authGuard()).toBeTruthy();
  });
});
