import { createAction, props } from '@ngrx/store';
import { AppState } from '../../interfaces/app';

// Example actions based on common app state patterns.
// Adjust these according to your actual appState.reducer logic.
export const loadProductsSuccess = createAction(
    '[AppState] Load Products Success',
    props<{ products: any[] }>()
);

export const loadProductsFailure = createAction(
    '[AppState] Load Products Error',
    props<{ error: string }>()
);

export const loadProducts = createAction(
    '[AppState] Load Products'
);

export const loadCollections = createAction(
    '[AppState] Load Collections'
);

export const loadCollectionsSuccess = createAction(
    '[AppState] Load Collections Success',
    props<{ collections: any[] }>()
);

export const loadCollectionsFailure = createAction(
    '[AppState] Load Collections Error',
    props<{ error: string }>()
);

export const addToCart = createAction(
    '[AppState] Add To Cart',
    props<{ productId: string; quantity: number }>()
);

export const removeFromCart = createAction(
    '[AppState] Remove From Cart',
    props<{ productId: string }>()
);

export const setState = createAction(
    "[AppState] setState", 
    props<{state: AppState}>()
);