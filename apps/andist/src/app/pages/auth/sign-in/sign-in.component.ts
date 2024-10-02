import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { AuthPageViewComponent } from '@andist/ui';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IconsModule } from '@andist/icons';
import { Store } from '@ngrx/store';
import { signIn } from '../../../state/auth/auth.actions';
import {
  selectAuthErrorMessage,
  selectIsAuthenticated,
} from '../../../state/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'apps/andist/src/environments/environment.development';


@Component({
  standalone: true,
  imports: [
    AuthPageViewComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    IconsModule,
    MatProgressSpinner,
    RouterModule,
  ],
  templateUrl: './sign-in.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sign-in',
})
export class SignInComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(UntypedFormBuilder);

  snackbarMessage: { message: string } | null = null;
  env = environment;
  signInForm: UntypedFormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    rememberMe: [''],
  });


  ngOnInit(): void {
    this.store
      .select(selectIsAuthenticated)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            const redirectURL =
              this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/signed-in-redirect';

            this.router.navigateByUrl(redirectURL);
          }
        },
      });

    this.store
      .select(selectAuthErrorMessage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (message) => {
          if (message) {
            this.snackbarMessage = { message };
            this.signInForm.enable();
          }
        },
      });
  }

  signIn(): void {
    if (this.signInForm.invalid) return;
    this.signInForm.disable();
    this.store.dispatch(signIn(this.signInForm.value));
  }
}
