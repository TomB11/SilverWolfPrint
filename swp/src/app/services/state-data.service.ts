import { inject, Injectable } from '@angular/core';
import { AppState } from '../interfaces/app';
import { Store } from '@ngrx/store';
import { setState } from '../state/appState/appState.actions';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {
  appState = inject(Store<{ appState: AppState }>)

  constructor() { }

  setSessionStorageStateData(state: AppState): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('appState', JSON.stringify(state));
    }
  }

  isSessionStorageFullfilled(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const savedState = sessionStorage.getItem('appState');
      if (savedState !== null) {
        let state: AppState = JSON.parse(savedState);
        return state.products.length > 0;
      }
      return false;
    }
    return false;
  }

  getStateData(): AppState | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const savedState = sessionStorage.getItem('appState');
      if (savedState !== null) {
        const parsedState: AppState = JSON.parse(savedState);
        this.appState.dispatch(setState({ state: parsedState }));
        return parsedState;
      }
    }
    return null;
  }
}
