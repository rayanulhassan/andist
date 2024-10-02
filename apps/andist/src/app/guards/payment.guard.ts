import { Injectable, inject } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, firstValueFrom } from 'rxjs';
import { selectIsAuthenticated } from '../state/auth/auth.selectors';
import { selectUser } from '../state/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class PaymentGuard implements CanMatch {
  #router = inject(Router);
  #store = inject(Store);

  canMatch():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const res = this._check();
    console.log('PaymentGuard#canMatch', res);
    return res;
  }

  private async _check(): Promise<boolean | UrlTree> {
    const isAuthenticated = await firstValueFrom(
      this.#store.select(selectIsAuthenticated)
    );
    const user = await firstValueFrom(this.#store.select(selectUser));

    console.log('isAuthenticated', isAuthenticated, 'user', user);

    if (!isAuthenticated || !user) {
      return false;
    }

    if (!user?.isPaid) {
      const urlTree = this.#router.parseUrl(`payment`);
      return urlTree;
    }
    return true;
  }
}
