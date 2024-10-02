import { Component, ViewEncapsulation, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CheckoutService,
  PaymentPlans,
  PaymentPlansTypes,
} from '@andist/stripe';
import { IconsModule } from '@andist/icons';
import {
  ButtonDarkDirective,
  ButtonWhiteDirective,
} from '../../../directives/button-dark.directive';

@Component({
  selector: 'payment-card',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    ButtonDarkDirective,
    ButtonWhiteDirective,
  ],
  templateUrl: './payment-card.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class PaymentCardComponent {
  #checkoutService = inject(CheckoutService);

  isPaidUser = input.required<boolean>()

  readonly paymentPlans = PaymentPlans.filter((x) => x.userType === 'normal');

  checkout(plan: PaymentPlansTypes) {
    this.#checkoutService.checkout(plan).subscribe((result: any) => {
      window.location.href = result.url;
    });
  }
}
