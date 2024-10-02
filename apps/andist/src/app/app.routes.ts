import { Route } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutsComponent } from './layouts/layouts.component';
// import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignOutComponent } from './pages/auth/sign-out/sign-out.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { DemoComponent } from './pages/demo/demo.component';
import { PaymentFormComponent } from './pages/payment/payment-form/payment-form.component';
import { PaymentGuard } from './guards/payment.guard';
// import { SignOutComponent } from './pages/auth/sign-out/sign-out.component';
// import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'demo',
  },

  {
    path: 'demo',
    canMatch: [AuthGuard],
    component: LayoutsComponent,
    data: {
      layout: 'default',
      forPaidUsers: true
    },
    children: [
      {
        path: '',
        component: DemoComponent,
      },
    ],
  },
  {
    path: 'payment',
    canMatch: [AuthGuard],
    component: LayoutsComponent,
    data: {
      layout: 'default',
    },
    children: [
      {
        path: '',
        component: PaymentFormComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutsComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-out',
        component: SignOutComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
];
