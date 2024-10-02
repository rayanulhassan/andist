import { CheckoutService, PaymentPlansTypes } from '@andist/stripe';
import {
  Component,
  DestroyRef,
  EmbeddedViewRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgForm,
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBarRef, } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  selectIsAuthenticated,
  selectAuthErrorMessage,
} from '../../../state/auth/auth.selectors';
import { signUp } from '../../../state/auth/auth.actions';
import { AuthPageViewComponent } from '@andist/ui';
import { IconsModule } from '@andist/icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
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
  templateUrl: './sign-up.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  selector: 'novva-sign-up',
})
export class SignUpComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;
  signUpForm!: UntypedFormGroup;

  @ViewChild('snackbar', { read: TemplateRef })
  snackbarTemplateRef!: TemplateRef<string>;
  snackbarRef: MatSnackBarRef<EmbeddedViewRef<string>> | undefined;
  snackbarMessage: { message: string } | null = null;
  paymentPlan: string | undefined = undefined;
  env = environment;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {
    this.paymentPlan = this.route.snapshot.queryParams['plan'];
    this.signUpForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      agreements: [''],
      company_identifier: [''],
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectIsAuthenticated)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            if (!this.paymentPlan) {
              const redirectURL =
                this.route.snapshot.queryParamMap.get('redirectURL') ||
                '/payment?user=new';
              this._router.navigateByUrl(redirectURL);
            } else if (this.paymentPlan === 'free') {
              const redirectURL =
                this.route.snapshot.queryParamMap.get('redirectURL') ||
                '/signed-in-redirect';
              this._router.navigateByUrl(redirectURL);
            } else {
              this.checkoutService
                .checkout(this.paymentPlan as PaymentPlansTypes)
                .subscribe((result: any) => {
                  window.location.href = result.url;
                });
            }
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
            this.signUpForm.enable();
          }
        },
      });
  }

  signUp(): void {
    if (this.signUpForm.invalid) return;

    this.signUpForm.disable();
    this.store.dispatch(signUp(this.signUpForm.value));
  }
}
