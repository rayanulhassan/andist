import { Injectable, inject } from '@angular/core';
import { createItem, deleteItem, readItems } from '@directus/sdk';
import { Observable, from } from 'rxjs';
import { Directus } from '../directus';
import { Position } from './positions.model';
@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  private directus = inject(Directus);

  loadPositions(): Observable<Position[]> {
    return from(this.directus.request<Position[]>(readItems('chats')));
  }

  createPosition(
    position: Pick<Position, 'name' | 'description'>
  ): Observable<Position> {
    return from(
      this.directus.request<Position>(createItem('chats', {
        name: position.name, description: position.description,
      }))
    );
  }

  deletePositions(id: string): Observable<unknown> {
    return from(this.directus.request(deleteItem('chats', id)));
  }
}
