import {
  RestClient,
  RestCommand,
  StaticTokenClient,
  createDirectus,
  rest,
  staticToken,
} from '@directus/sdk';
import { User } from './users/user.model';
import { Position } from './positions/positions.model';
import { Injectable, inject } from '@angular/core';
import { SpinnerService } from '@andist/ui';

import { Observable, finalize, from } from 'rxjs';

interface DirectusSchema {
  users: User[];
  chats: Position[];
}

@Injectable({
  providedIn: 'root',
})
export class Directus {
  private _snipper = inject(SpinnerService);

  private _client: RestClient<DirectusSchema> &
    StaticTokenClient<DirectusSchema> = createDirectus<DirectusSchema>(
    'https://whale-app-em2tj.ondigitalocean.app'
  )
    .with(rest())
    .with(staticToken(''));

  request<Output>(
    args: RestCommand<unknown, DirectusSchema>,
    config: { showSpinner: boolean } = { showSpinner: true }
  ): Observable<Output> {
    if (config.showSpinner) this._snipper.showSpinner();
    return from(this._client.request<Output>(args)).pipe(
      finalize(() => {
        if (config.showSpinner) this._snipper.hideSpinner();
      })
    );
  }

  setClientToken(token: string | null) {
    this._client.setToken(token);
  }
}
