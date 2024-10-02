import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '@andist/directus';
import { getUser, getUserFailure, getUserSuccess } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private authService = inject(UsersService);

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(() =>
        this.authService.getUser().pipe(
          map((user) =>
            getUserSuccess({
              user: user,
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
              getUserFailure({
                message: errorResponse.message,
              })
            );
          })
        )
      )
    )
  );
}
