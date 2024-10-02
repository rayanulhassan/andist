import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService, UsersService } from '@andist/directus';
import {
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signUp,
  signUpFailure,
} from './auth.actions';
import { EMPTY, catchError, firstValueFrom, map, of, switchMap } from 'rxjs';
import { getUserSuccess } from '../user/user.actions';
import { Store } from '@ngrx/store';
import { selectRefreshToken } from './auth.selectors';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private store = inject(Store);

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap((credentials) =>
        this.authService
          .signIn({
            email: credentials.email,
            password: credentials.password,
          })
          .pipe(
            map((authData) =>
              signInSuccess({
                accessToken: authData.access_token ?? '',
                refreshToken: authData.refresh_token ?? '',
              })
            ),
            catchError((error) => {
              let errorResponse = {
                message: 'Some error has occured',
                error: error,
              };
              console.log(error);

              if (error.errors && error.errors.length > 0)
                errorResponse = {
                  ...errorResponse,
                  message: error.errors.map((x: any) => x.message).join('\n'),
                };
              return of(
                signInFailure({
                  message: errorResponse.message,
                })
              );
            })
          )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) =>
            getUserSuccess({
              user: user,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap((user) =>
        this.authService.signUp(user).pipe(
          map(() =>
            signIn({
              email: user.email,
              password: user.password,
            })
          ),
          catchError((error) => {
            let errorResponse = {
              message: 'Some error has occured',
              error: error,
            };
            console.log(error);

            if (error.errors && error.errors.length > 0)
              errorResponse = {
                ...errorResponse,
                message: error.errors.map((x: any) => x.message).join('\n'),
              };
            return of(
              signUpFailure({
                message: errorResponse.message,
              })
            );
          })
        )
      )
    )
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        switchMap(async () => {
          const refreshToken = await firstValueFrom(
            this.store.select(selectRefreshToken)
          );
          return this.authService.signOut(refreshToken ?? '');
        })
      ),
    { dispatch: false }
  );
}
