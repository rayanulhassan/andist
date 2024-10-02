import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@andist/icons';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDarkDirective } from '../../../directives/button-dark.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'side-navbar',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonDarkDirective,
    MatSlideToggleModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './side-navbar.component.html',
  styles: `
  .custom-account-settings-btn {
    background-color: white !important;
    color: #030712 !important;
  } 

  @media (max-width: 768px) {
  #custom-responsive-sidebar {
    position: absolute;
    height: 100vh;
  }
}
 `,
  encapsulation: ViewEncapsulation.None,
})
export class SideNavbarComponent {
  private media = inject(MediaMatcher);

  isSideNavbarOpen = input.required<boolean>();
  isUserPaid = input.required<boolean>();
  app_name = input.required<string>();
  @Output() sideNavbarClose = new EventEmitter<boolean>();


  isSmScreenHiddenClassActive = computed<boolean>(() =>
    !this.isSideNavbarOpen()
  );
  
  constructor() {
    this.media
      .matchMedia('(max-width: 768px)')
      .addEventListener('change', (e) => {
        if (!e.matches) {
          this.sideNavbarClose.emit(false);
        }
      });
  }
}
