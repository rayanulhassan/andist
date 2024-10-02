import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IconsModule } from '@andist/icons';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'top-navbar',
  standalone: true,
  imports: [IconsModule, RouterModule, MatSlideToggleModule,FormsModule,MatSelectModule],
  templateUrl: './top-navbar.component.html',
  styles: `
  .active-btn {
    background-color: white;
    mat-icon {
      color: #030712 !important;
    }
  }
 .hover-btn:hover {
  mat-icon {
    color: #030712;
  }
}
.hover-btn {
  mat-icon {
    color: white;
  }
}
.mdc-label{
  color: white !important;
}
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TopNavbarComponent {


  @Output() navbarOpen = new EventEmitter<boolean>();
}
