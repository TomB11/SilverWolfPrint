import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AppStateActions from './appState.actions';
import { ApiCallsService } from '../../services/api-calls.service';
import { PrintItem } from '../../interfaces/printItem';

@Injectable()
export class AppStateEffects {
    loadProducts$

    constructor(
        private actions$: Actions,
        private apiCallService: ApiCallsService
    ) {
        this.loadProducts$ = createEffect(() =>
            this.actions$.pipe(
              ofType(AppStateActions.loadProducts),
              tap(() => console.log('Effect triggered: loadProducts')),
              exhaustMap(() =>
                this.apiCallService.getAllProductsFromServer().pipe(
                  map((products: PrintItem[]) => {
                    console.log('Products loaded from server:', products);
                    return AppStateActions.loadProductsSuccess({ products });
                  }),
                  catchError(error => {
                    console.error('Error loading products:', error);
                    return of(AppStateActions.loadProductsFailure({ error }));
                  })
                )
              )
            )
          );
    }
}