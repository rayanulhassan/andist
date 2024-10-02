import { Injectable, inject } from '@angular/core';
import { Directus } from '../directus';
import {
  AuthenticationData,
  createUser,
  login,
  logout,
  refresh,
} from '@directus/sdk';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthUtils } from './auth.utils';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private directus = inject(Directus);

  signIn(credentials: {
    email: string;
    password: string;
  }): Observable<AuthenticationData> {
    return this.directus
      .request<AuthenticationData>(
        login(credentials.email, credentials.password, {
          mode: 'json',
        })
      )
      .pipe(
        tap((response) => {
          this.directus.setClientToken(response.access_token);
        })
      );
  }

  signInUsingToken(refreshToken: string): Observable<AuthenticationData> {
    return this.directus
      .request<AuthenticationData>(refresh('json', refreshToken))
      .pipe(
        tap((response) => {
          this.directus.setClientToken(response.access_token);
        })
      );
  }

  signUp(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    // const role = '';
    // if (user.company_identifier) role = this.newProjectBasedUser;
    // else role = this.newUnpaidUserRoleId;
    return this.directus.request<User>(
      createUser({
        ...user,
      })
    );
  }

  //   signInUsingToken(): Observable<any> {
  //     // Sign in using the token
  //     this.spinnerService.showSpinner();
  //     return from(
  //       Directus.client.request(refresh('json', this.refreshToken))
  //     ).pipe(
  //       catchError(() =>
  //         // Return false
  //         of(false)
  //       ),
  //       switchMap((response: any) => {
  //         // Replace the access token with the new one if it's available on
  //         // the response object.
  //         if (!response) return of(false);

  //         this.accessToken = response.access_token;
  //         this.refreshToken = response.refresh_token;
  //         Directus.client.setToken(response.access_token);

  //         // Set the authenticated flag to true
  //         this._authenticated = true;

  //         return this.#users.getUser();
  //       }),
  //       finalize(() => this.spinnerService.hideSpinner())
  //     );
  //   }

  //   forgotPassword(email: string): Observable<any> {
  //     this.spinnerService.showSpinner();
  //     return from(
  //       Directus.client.request(
  //         passwordRequest(email, `https://tintto-nova.web.app/reset-password`)
  //       )
  //     ).pipe(finalize(() => this.spinnerService.hideSpinner()));
  //   }

  //   resetPassword(reset_token: string, password: string): Observable<any> {
  //     this.spinnerService.showSpinner();
  //     return from(
  //       Directus.client.request(passwordReset(reset_token, password))
  //     ).pipe(finalize(() => this.spinnerService.hideSpinner()));
  //   }

  //   signOut(): Observable<any> {
  //     Directus.client.request(logout(this.refreshToken)).then();
  //     Directus.client.setToken(null);

  //     // Unset User signal
  //     this.#users.unsetUser();

  //     // Remove the access token from the local storage
  //     localStorage.removeItem(this.accessToken_localstorage_key);
  //     localStorage.removeItem(this.refreshToken_localstorage_key);

  //     // Set the authenticated flag to false
  //     this._authenticated = false;

  //     // Return the observable
  //     return of(true);
  //   }

  signOut(refreshToken: string): Observable<void> {
    return this.directus.request(logout(refreshToken), {
      showSpinner: false,
    });
  }

  check(
    accessToken: string | null,
    refreshToken: string | null
  ): Observable<boolean | AuthenticationData> {
    if (!accessToken || !refreshToken) {
      return of(false);
    }
    if (AuthUtils.isTokenExpired(accessToken)) {
      return of(false);
    }
    return this.signInUsingToken(refreshToken).pipe(
      catchError(() => of(false))
    );
  }
}
