import {
  Component,
  EmbeddedViewRef,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-pages-view',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './auth-pages-view.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AuthPageViewComponent implements OnChanges {
  snackbarService = inject(MatSnackBar);

  snackbarMessage = input.required<{ message: string } | null>();
  app_name = input.required<string>();
  app_version_name = input<string>();
  app_description = input<string>();

  @ViewChild('snackbar', { read: TemplateRef })
  snackbarTemplateRef!: TemplateRef<string>;
  snackbarRef: MatSnackBarRef<EmbeddedViewRef<string>> | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['snackbarMessage'] && this.snackbarMessage()) {
      this.showSnackbar();
    }
  }

  showSnackbar() {
    this.snackbarRef = this.snackbarService.openFromTemplate(
      this.snackbarTemplateRef,
      {
        duration: 0,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
      }
    );
  }
}
