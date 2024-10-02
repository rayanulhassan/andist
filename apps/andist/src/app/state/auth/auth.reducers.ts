import { createReducer, on } from '@ngrx/store';
import {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpFailure,
  signOut,
} from './auth.actions';

const ACCESSTOKEN_LC_KEY = 'novva-accesstoken';
const REFRESHTOKEN_LC_KEY = 'novva-refreshtoken';

export enum AuthStatus {
  PENDING = 'pending',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface AuthState {
  authenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
  status: AuthStatus;
}

export const initialState: AuthState = {
  authenticated: false,
  accessToken: localStorage.getItem(ACCESSTOKEN_LC_KEY),
  refreshToken: localStorage.getItem(REFRESHTOKEN_LC_KEY),
  errorMessage: null,
  status: AuthStatus.PENDING,
};

export const authReducer = createReducer(
  initialState,
  on(signIn, (state) => ({
    ...state,
    status: AuthStatus.LOADING,
  })),
  on(signInSuccess, (state, { accessToken, refreshToken }) => {
    localStorage.setItem(ACCESSTOKEN_LC_KEY, accessToken);
    localStorage.setItem(REFRESHTOKEN_LC_KEY, refreshToken);
    return {
      ...state,
      accessToken: accessToken,
      refreshToken: refreshToken,
      authenticated: true,
      status: AuthStatus.SUCCESS,
      errorMessage: null,
    };
  }),
  on(signInFailure, (state, { message }) => ({
    ...state,
    errorMessage: message,
    status: AuthStatus.ERROR,
  })),
  on(signUp, (state) => ({
    ...state,
    status: AuthStatus.LOADING,
  })),
  on(signUpFailure, (state, { message }) => ({
    ...state,
    errorMessage: message,
    status: AuthStatus.ERROR,
  })),
  on(signOut, (state) => {
    localStorage.removeItem(ACCESSTOKEN_LC_KEY);
    localStorage.removeItem(REFRESHTOKEN_LC_KEY);
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      status: AuthStatus.SUCCESS,
      errorMessage: null,
    };
  })
);
