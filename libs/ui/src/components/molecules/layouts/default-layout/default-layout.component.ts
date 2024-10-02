import {  NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { DrawerService } from '../../../../services/drawer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'default-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet,NgTemplateOutlet],
  templateUrl: './default-layout.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultLayoutComponent implements OnInit,OnChanges,OnDestroy {
  private drawerService = inject(DrawerService);
  private cd = inject(ChangeDetectorRef);
  
  topbarEl = input.required<TemplateRef<any>>();
  sidenavbarEl = input.required<TemplateRef<any>>();
  currentTopbarEl!: TemplateRef<any>;
  currentSidenavbarEl!: TemplateRef<any>;

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
  }

  ngOnChanges() {
    this.currentTopbarEl = this.topbarEl();
    this.currentSidenavbarEl = this.sidenavbarEl();
  }

  ngOnDestroy() {
    if (this.drawerSubscription) this.drawerSubscription.unsubscribe();
  }
}
