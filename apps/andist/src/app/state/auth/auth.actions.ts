import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] SignIn',
  props<{ email: string; password: string }>()
);
export const signInSuccess = createAction(
  '[Auth] SignIn Success',
  props<{ accessToken: string; refreshToken: string }>()
);
export const signInFailure = createAction(
    '[Auth] SignIn Failure',
    props<{ message: string }>()
  );



  export const signUp = createAction(
    '[Auth] SignUp',
    props<{ name: string, email: string; password: string }>()
  );

  export const signUpFailure = createAction(
      '[Auth] SignUp Failure',
      props<{ message: string }>()
    );
  
  
export const signOut = createAction('[Auth] SignOut');
export const reset = createAction('[Auth] Reset');
