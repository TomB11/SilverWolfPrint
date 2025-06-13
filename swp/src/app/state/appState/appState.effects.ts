import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
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
                mergeMap(() =>
                    this.apiCallService.getProducts().pipe( // <-- use the Observable method
                        map((products: PrintItem[]) => AppStateActions.loadProductsSuccess({ products })),
                        catchError(error => of(AppStateActions.loadProductsFailure({ error })))
                    )
                )
            )
        );
    }
}