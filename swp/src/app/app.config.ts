import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { appStateReducer, initialState } from './state/appState/appState.reducer';
import { AppStateEffects } from './state/appState/appState.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideStore(
      { appState: appStateReducer }
    ),
    provideEffects([
      AppStateEffects
    ])
  ]
};
