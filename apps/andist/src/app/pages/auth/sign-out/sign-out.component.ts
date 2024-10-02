import { AuthService } from '@andist/directus';
import { I18nPluralPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {  timer, finalize, takeWhile, tap } from 'rxjs';
import { signOut } from '../../../state/auth/auth.actions';

@Component({
  standalone: true,
  imports: [RouterModule,I18nPluralPipe],
  templateUrl: './sign-out.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  selector: 'novva-sign-out',
})
export class SignOutComponent implements OnInit {
  #store = inject(Store)
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  countdown = 5;
  countdownMapping = {
    '=1': '# second',
    other: '# seconds',
  };

  ngOnInit(): void {
    // Sign out
    // this.#authService.signOut();

    this.#store.dispatch(signOut())

    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this.#router.navigate(['sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntilDestroyed(this.#destroyRef),
        tap(() => this.countdown--)
      )
      .subscribe();
  }
}
