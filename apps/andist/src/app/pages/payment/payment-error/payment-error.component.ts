import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tintto-nova-payment-error',
  standalone: true,
  imports: [CommonModule,LottieComponent,RouterModule],
  templateUrl: './payment-error.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class PaymentErrorComponent {
  options: AnimationOptions = {
    path: '/assets/animations/error.json',
    loop: false,
  };
}
