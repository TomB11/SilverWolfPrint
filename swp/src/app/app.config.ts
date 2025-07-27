import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { appStateReducer, initialState } from './state/appState/appState.reducer';
import { AppStateEffects } from './state/appState/appState.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(
      { appState: appStateReducer }
    ),
    provideEffects([
      AppStateEffects
    ])
  ]
};
