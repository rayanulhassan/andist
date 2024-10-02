import { createReducer, on } from '@ngrx/store';
import { getUser, getUserFailure, getUserSuccess } from './user.actions';
import { User } from '@andist/directus';

export enum UserStatus {
  PENDING = 'pending',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface UserState {
  user: User | null;
  status: UserStatus;
  errorMessage: string | null;
}

export const initialState: UserState = {
  user: null,
  status: UserStatus.PENDING,
  errorMessage: null,
};

export const userReducer = createReducer(
  initialState,
  on(getUser, (state) => ({
    ...state,
    status: UserStatus.LOADING,
  })),
  on(getUserSuccess, (state, { user }) => {
    console.log('getUserSuccess');
    console.log(user);
    return {
      ...state,
      user: user,
      errorMessage: null,
      status: UserStatus.SUCCESS,
    };
  }),
  on(getUserFailure, (state, { message }) => ({
    ...state,
    errorMessage: message,
    status: UserStatus.ERROR,
  }))
);
