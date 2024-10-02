import { Injectable, inject } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@andist/directus';
import { Observable, firstValueFrom, of, switchMap } from 'rxjs';
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectRefreshToken,
} from '../state/auth/auth.selectors';
import { signInSuccess } from '../state/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const res = this._check(segments);
      console.log('AuthGuard#canMatch', res);
    return res;
  }

  private async _check(segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const isAuthenticated = await firstValueFrom(
      this.store.select(selectIsAuthenticated)
    );
    if (isAuthenticated) {
      return true;
    }
    const accessToken = await firstValueFrom(
      this.store.select(selectAccessToken)
    );
    const refreshToken = await firstValueFrom(
      this.store.select(selectRefreshToken)
    );

    // Check the authentication status
    return firstValueFrom(
      this.authService.check(accessToken, refreshToken).pipe(
        switchMap((authenticated) => {
          // If the user is not authenticated...
          if (!authenticated) {
            // Redirect to the sign-in page with a redirectUrl param
            const redirectURL = `/${segments.join('/')}`;
            const urlTree = this.router.parseUrl(
              `sign-in?redirectURL=${redirectURL}`
            );

            return of(urlTree);
          }

          if (
            typeof authenticated === 'object' &&
            authenticated.access_token &&
            authenticated.refresh_token
          ) {
            this.store.dispatch(
              signInSuccess({
                accessToken: authenticated.access_token,
                refreshToken: authenticated.refresh_token,
              })
            );
          }
          console.log("1")
          return of(true);
        })
      )
    );
  }
}
