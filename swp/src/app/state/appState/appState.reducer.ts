import { createReducer, on, Action } from '@ngrx/store';
import * as AppStateActions from './appState.actions';
import { AppState } from '../../interfaces/app';

export const initialState: AppState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
};

const reducer = createReducer(
    initialState,
    on(AppStateActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AppStateActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        loading: false,
    })),
    on(AppStateActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AppStateActions.addToCart, (state, { productId, quantity }) => {
        const existing = state.cart.find(item => item.productId === productId);
        let newCart;
        if (existing) {
            newCart = state.cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            newCart = [...state.cart, { productId, quantity }];
        }
        return { ...state, cart: newCart };
    }),
    on(AppStateActions.removeFromCart, (state, { productId }) => ({
        ...state,
        cart: state.cart.filter(item => item.productId !== productId),
    }))
);

export function appStateReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}