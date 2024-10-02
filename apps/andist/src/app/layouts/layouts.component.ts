import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  EmptyLayoutComponent,
  DefaultLayoutComponent,
  TopNavbarComponent,
  SideNavbarComponent,
  ProjectFormComponent,
} from '@andist/ui';
import {  User, UserTypes } from '@andist/directus';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectIsSideNavbarOpen } from '../state/ui/ui.selectors';
import { selectUser } from '../state/user/user.selectors';
import { closeSideNavbar, openSideNavbar } from '../state/ui/ui.actions';
import {  MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment.development';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    EmptyLayoutComponent,
    DefaultLayoutComponent,
    TopNavbarComponent,
    SideNavbarComponent,
  ],
  templateUrl: './layouts.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class LayoutsComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  isSideNavbarOpen = toSignal<boolean>(
    this.store.select(selectIsSideNavbarOpen)
  );
 
  user: User | null = null;
  userTypes = UserTypes;
  dialogRef: MatDialogRef<ProjectFormComponent> | null = null;
  env = environment;
  activatedRouteData = toSignal(inject(ActivatedRoute).data);



  ngOnInit(): void {
    // this.store.select(selectIsSideNavbarOpen).subscribe({
    //   next: (isOpen) => console.log('isOpen', isOpen),
    // });


    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          // only fetch data when user data is available
          if (user) {
            this.user = user;
            console.log('user', user);
            console.log('user', this.activatedRouteData()?.['forPaidUsers']);
            if(this.activatedRouteData()?.['forPaidUsers'] && !user.isPaid){
              this.router.navigate(['/payment']);
            }
          }
        },
      });

   
  }


  navbarOpen(isOpen: boolean) {
    if (isOpen) this.store.dispatch(openSideNavbar());
    else this.store.dispatch(closeSideNavbar());
  }






}
