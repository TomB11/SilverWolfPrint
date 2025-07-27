import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/app';

export const selectAppState = (state: { appState: AppState }) => state.appState;

export const selectProducts = createSelector(
  selectAppState,
  (state: AppState) => state.products
);