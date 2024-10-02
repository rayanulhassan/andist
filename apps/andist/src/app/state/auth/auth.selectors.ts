import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducers';

export const selectAuth = (state: AppState) => state.auth;
export const selectAccessToken = createSelector(
  selectAuth,
  (state: AuthState) => state.accessToken
);
export const selectRefreshToken = createSelector(
  selectAuth,
  (state: AuthState) => state.refreshToken
);
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.authenticated
);
export const selectAuthErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage
);
