import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { DrawerService } from '../../../../services/drawer.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'empty-layout',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, NgxSpinnerModule],
  templateUrl: './empty-layout.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class EmptyLayoutComponent {
  private drawerService = inject(DrawerService);
  private cd = inject(ChangeDetectorRef);
  private spinnerService = inject(SpinnerService);
  private ngxSpinner = inject(NgxSpinnerService);

  @ViewChild('sidenav', {
    static: true,
  })
  sidenav!: MatSidenav;
  activeComponent!: any;
  activeComponentInputs: any = {};

  private drawerSubscription: Subscription =
    this.drawerService.state$.subscribe({
      next: (state) => {
        this.activeComponentInputs = state.viewComponentParameters;
        this.activeComponent = state.viewComponent;
        this.cd.detectChanges();
      },
    });

  ngOnInit() {
    this.drawerService.drawer = this.sidenav;

    this.spinnerService.isSpinning$.subscribe({
      next: (isSpinning) => {
        if (isSpinning) this.ngxSpinner.show();
        else this.ngxSpinner.hide();
      },
    });
  }

  ngOnDestroy() {
    if (this.drawerSubscription) this.drawerSubscription.unsubscribe();
  }
}
