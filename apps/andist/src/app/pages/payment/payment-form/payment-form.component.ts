import { Component, inject, ViewEncapsulation } from '@angular/core';
import { PaymentCardComponent } from "@andist/ui";
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/user/user.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'tintto-nova-payment-form',
    standalone: true,
    templateUrl: './payment-form.component.html',
    styles: ``,
    encapsulation: ViewEncapsulation.None,
    imports: [PaymentCardComponent,AsyncPipe]
})
export class PaymentFormComponent {
    #store = inject(Store);
    user$ = this.#store.select(selectUser);
    
 
}
