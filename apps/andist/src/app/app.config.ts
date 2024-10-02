import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './state/auth/auth.reducers';
import { uiReducer } from './state/ui/ui.reducers';
import { userReducer } from './state/user/user.reducers';
import { AuthEffects } from './state/auth/auth.effects';
import { UserEffects } from './state/user/user.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DirectusInterceptor } from '@andist/directus';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([AuthEffects, UserEffects]),
    provideHttpClient(withInterceptors([DirectusInterceptor])),
    provideStore({
      auth: authReducer,
      user: userReducer,
      
      ui:uiReducer
    }),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
