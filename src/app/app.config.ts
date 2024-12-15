import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './states/user-state/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import * as userEffects from './states/user-state/user.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideStore(),
    provideHttpClient(),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects(userEffects)
  ]
};

console.log("prdni")