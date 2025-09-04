import { inject, Injectable } from '@angular/core';
import { AppState } from '../interfaces/app';
import { Store } from '@ngrx/store';
import { setState } from '../state/appState/appState.actions';
import { CartItem } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {
  appState = inject(Store<{ appState: AppState }>)

  setLocalStorageStateData(state: AppState): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('appState', JSON.stringify(state));
    }
  }

  isLocalStorageFullfilled(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedState = localStorage.getItem('appState');
      if (savedState !== null) {
        let state: AppState = JSON.parse(savedState);
        return state.products.length > 0;
      }
      return false;
    }
    return false;
  }

  getStateData(): AppState | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedState = localStorage.getItem('appState');
      if (savedState !== null) {
        const parsedState: AppState = JSON.parse(savedState);
        this.appState.dispatch(setState({ state: parsedState }));
        return parsedState;
      }
    }
    return null;
  }

  addToCart(selectedProduct: CartItem): void {
    const savedState = localStorage.getItem('appState');
    let currentState: AppState = savedState ? JSON.parse(savedState) : {
      cart: [],
      products: [],
      loading: false,
      error: null
    };

    const product = currentState.products.find(p => String(p.id) === selectedProduct.productId);
    if (!product) {
      // Optionally handle the case where the product is not found
      return;
    }
    const cartItem = {
      productId: selectedProduct.productId,
      quantity: selectedProduct.quantity,
      name: product.name,
      price: product.price,
      image: product.image
    };

    this.appState.dispatch(setState({ state: {
      ...currentState,
      cart: [...currentState.cart, cartItem]
    }}));
    this.setLocalStorageStateData({
      ...currentState,
      cart: [...currentState.cart, cartItem]
    });
  }
}
