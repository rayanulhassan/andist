import { Injectable, inject } from '@angular/core';
import { User} from './user.model';
import { readMe } from '@directus/sdk';
import { Observable, from, map } from 'rxjs';
import { Directus } from '../directus';
import {
  premiumUserRoleId,
  enterpriseUserRoleId,
} from './user.info';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private directus = inject(Directus);

  getUser(): Observable<User> {
    return from(this.directus.request<User>(readMe())).pipe(
      map((user) => {
        if (
          user.role === premiumUserRoleId ||
          user.role === enterpriseUserRoleId 
        )
          user.isPaid = true;
        else user.isPaid = false;

       

        return user;
      })
    );
  }
}
