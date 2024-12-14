import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './states/user-state/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './states/user-state/user.effects';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideStore(),
    // provideEffects([UserEffects]),
    provideHttpClient(),
    provideState({ name: 'users', reducer: userReducer }),
    ApiService
  ]
};

console.log("prdni")