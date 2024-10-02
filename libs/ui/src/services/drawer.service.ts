import {
  Injectable,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private router = inject(Router);

  private onChange = new Subject<{
    isOpen: boolean;
    viewComponent: any;
    viewComponentParameters: any;
  }>();
  private isOpened: boolean = false;
  private drawerEl!: MatSidenav;

  state$ = this.onChange.asObservable();

  set drawer(el: MatSidenav) {
    this.drawerEl = el;
  }

  get isOpen(): boolean {
    return this.isOpened;
  }

  open(component: any, componentOptions: any): void {
    this.drawerEl.open();
    this.isOpened = true;
    this.onChange.next({
      isOpen: this.isOpened,
      viewComponent: component,
      viewComponentParameters: componentOptions,
    });
  }

  close(): void {
    if (this.drawerEl.opened) this.drawerEl.close();
    this.isOpened = false;
    this.onChange.next({
      isOpen: this.isOpened,
      viewComponent: null,
      viewComponentParameters: null,
    });

    this.router.navigate([]);
  }
}
