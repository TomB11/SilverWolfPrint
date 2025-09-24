import { createReducer, on, Action } from '@ngrx/store';
import * as AppStateActions from './appState.actions';
import { AppState } from '../../interfaces/app';

export const initialState: AppState = {
    products: [],
    cart: [],
    isCartVisible: false,
    loading: false,
    error: null,
};

const reducer = createReducer(
    initialState,
    on(AppStateActions.setState, (state, action) => {
        return {
            ...state,
            products: action.state.products,
            cart: action.state.cart,
            loading: action.state.loading,
            error: action.state.error
        }
    }),
    on(AppStateActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AppStateActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        products, // <--- must update!
        loading: false,
        error: null
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
            // Find the product details from products array
            const product = state.products.find(p => String(p._id) === productId);
            if (!product) {
                // If product not found, do not add to cart
                return state;
            }
            // Create a full CartItem object
            const newCartItem = {
                productId,
                quantity,
                name: product.name,
                price: product.price,
                image: product.image
            };
            newCart = [...state.cart, newCartItem];
        }
        return { ...state, cart: newCart, isCartVisible: true };
    }),
    on(AppStateActions.removeFromCart, (state, { productId }) => ({
        ...state,
        cart: state.cart.filter(item => item.productId !== productId),
    }))
);

export function appStateReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}