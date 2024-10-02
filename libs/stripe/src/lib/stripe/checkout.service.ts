import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaymentPlans, PaymentPlansTypes } from './types/payment-plans.types';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private http = inject(HttpClient);

  private readonly paymentPlans = PaymentPlans;
  // 'http://127.0.0.1:5001/tintto-15ef9/us-central1/widgets/';
  private readonly server_url: string =
    '';

  get stripePackages() {
    const packages:any = {};
    for (let index = 0; index < this.paymentPlans.length; index++) {
      const element = this.paymentPlans[index];
      // let newPackage = {
      //   price_data: {
      //     currency: 'eur',
      //     product_data: {
      //       name: `Tintto ${element.text} subscription`,
      //     },
      //     unit_amount: element.price * 100,
      //   },
      //   quantity: 1,
      // };

      const newPackage = {
        price: element.priceId,
        quantity: 1,
      };
      packages[element.name] = newPackage;
    }

    return packages;
  }

  checkout(plan: PaymentPlansTypes) {
    // Check the server.js tab to see an example implementation
    return this.http.post(`${this.server_url}create-checkout-session`, {
      plan: this.stripePackages[plan],
      origin: window.location.origin,
    });
  }

  confirmOrderSuccess(sessionId: string) {
    return this.http.get(
      `${this.server_url}order/success?session_id=${sessionId}`
    );
  }

  upgradeAccount(userId: string, roleId: string, sessionId: string) {
    return this.http.post(`${this.server_url}account/upgrade`, {
      userId: userId,
      roleId: roleId,
      sessionId: sessionId,
    });
  }
}
