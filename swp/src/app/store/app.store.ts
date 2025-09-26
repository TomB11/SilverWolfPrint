import { AppState } from "../interfaces/app"
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ApiCallsService } from "../services/api-calls.service";
import { inject } from "@angular/core";
import { tap, catchError, of } from "rxjs";

type signalAppState = {
    app: AppState,
    storedInLocalStorage: boolean
}

const initialSignalAppState: signalAppState = {
    app: {
        products: [],
        collections: [],
        cart: [],
        loading: false,
        error: null
    },
    storedInLocalStorage: false
}

export const AppSignalStore = signalStore(
    {providedIn: 'root'},
    withState(initialSignalAppState),
    withMethods(
        (store, apiService = inject(ApiCallsService)) => ({

            async loadAll() {
                patchState(store, { app: { 
                    products: typeof store.app.products === 'function' ? store.app.products() : store.app.products,
                    collections: typeof store.app.collections === 'function' ? store.app.collections() : store.app.collections,
                    cart: typeof store.app.cart === 'function' ? store.app.cart() : store.app.cart,
                    loading: true,
                    error: typeof store.app.error === 'function' ? store.app.error() : store.app.error
                } });
                
                const callService = apiService.getAllProductsFromServer().pipe(
                    tap(products => {
                        console.log('Products loaded from server:', products);
                        patchState(store, { 
                            app: { 
                                ...store.app, 
                                products: products, 
                                collections: typeof store.app.collections === 'function' ? store.app.collections() : store.app.collections,
                                cart: typeof store.app.cart === 'function' ? store.app.cart() : store.app.cart,
                                isCartVisible: typeof store.app.isCartVisible === 'function' ? store.app.isCartVisible() : store.app.isCartVisible,
                                error: typeof store.app.error === 'function' ? store.app.error() : store.app.error,
                                loading: false 
                            }
                        });
                    }),
                    catchError(error => {
                        console.error('Error loading products:', error);
                        patchState(store, { 
                            app: { 
                                ...store.app, 
                                products: typeof store.app.products === 'function' ? store.app.products() : store.app.products,
                                collections: typeof store.app.collections === 'function' ? store.app.collections() : store.app.collections,
                                isCartVisible: typeof store.app.isCartVisible === 'function' ? store.app.isCartVisible() : store.app.isCartVisible,
                                cart: typeof store.app.cart === 'function' ? store.app.cart() : store.app.cart,
                                loading: false, 
                                error 
                            } 
                        });
                        return of([]);
                    })
                );
            }
        })
    )
);