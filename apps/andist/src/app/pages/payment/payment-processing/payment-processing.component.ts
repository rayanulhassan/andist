import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService, PaymentPlans } from '@tintto-nova/stripe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AuthService, UsersService } from '@tintto-nova/directus';
import { switchMap } from 'rxjs';

@Component({
  selector: 'tintto-nova-payment-processing',
  standalone: true,
  imports: [CommonModule, LottieComponent, RouterModule],
  templateUrl: './payment-processing.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class PaymentProcessingComponent {
  #checkoutService = inject(CheckoutService);
  #route = inject(ActivatedRoute);
  #user = inject(UsersService);
  #auth = inject(AuthService);
  #router = inject(Router);

  payment_session_id: string =
    this.#route.snapshot.queryParams['session_id'] ?? '';
  status:
    | 'payment_check'
    | 'payment_success'
    | 'payment_failed'
    | 'user_update'
    | 'user_update_failed'
    | 'user_update_success' = 'payment_check';

  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true,
  };

  ngOnInit() {
    this.verifyTransaction();
  }

  verifyTransaction() {
    this.#auth
      .signInUsingToken()
      .pipe(
        switchMap(() =>
          this.#checkoutService.confirmOrderSuccess(this.payment_session_id)
        )
      )
      .subscribe({
        next: (res: any) => {
          const paymentAmount = res.session.amount_total / 100;
          const newRoleId =
            PaymentPlans.find((x) => x.price === paymentAmount)
              ?.assignedUserRole ?? '';
          this.status = 'payment_success';
          this.upgradeUserAccount(newRoleId);
        },
        error: () => {
          this.options = {
            path: '/assets/animations/error.json',
            loop: false,
          };
          this.status = 'payment_failed';
        },
      });
  }

  // This is a temp solution.
  // Ideally this should be done via cloud function.
  // Cloud fnction should a) Verify transaction b) update user with admin role.
  upgradeUserAccount(roleId: string) {
    this.status = 'user_update';
    this.#user.upgradeUserAccount(roleId).subscribe({
      next: (resp: any) => {
        this.status = 'user_update_success';
        this.options = {
          path: '/assets/animations/success.json',
          loop: false,
        };

        if(this.#user.isProjectUser()){
          setTimeout(() => {
            this.#router.navigate(['/company-user-signed-in-redirect']);
          }, 4000);
        }
        else{
          setTimeout(() => {
            this.#router.navigate(['/signed-in-redirect']);
          }, 4000);
        }

        setTimeout(() => {
          this.#router.navigate(['/signed-in-redirect']);
        }, 4000);
      },
      error: () => {
        this.options = {
          path: '/assets/animations/error.json',
          loop: false,
        };
        this.status = 'user_update_failed';
      },
    });
  }
}
