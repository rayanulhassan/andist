import { createAction, props } from '@ngrx/store';
import { User } from '@andist/directus';

export const getUser = createAction(
  '[User] GetUser'
);
export const getUserSuccess = createAction(
  '[User] GetUserSuccess',
  props<{ user: User }>()
);
export const getUserFailure = createAction(
    '[User] getUserFailure',
    props<{ message: string }>()
  );
// export const signOut = createAction('[User] SignOut');
// export const reset = createAction('[User] Reset');
