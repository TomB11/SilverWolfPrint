import { inject, Injectable } from '@angular/core';
import { AppState } from '../interfaces/app';
import { Store } from '@ngrx/store';
import { loadCollections, loadProducts, setState } from '../state/appState/appState.actions';
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
        this.appState.dispatch(loadCollections());
        this.appState.dispatch(loadProducts());
        this.appState.dispatch(setState({ state: parsedState }));
        return parsedState;
      }
    }
    return null;
  }

  getCorectCollection(collectionId: string) {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      let currentState: AppState = JSON.parse(savedState);
      return currentState.collections.find(col => String(col.code) === collectionId);
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

    const product = currentState.products.find(p => String(p._id) === selectedProduct.productId);
    if (!product) {
      return;
    }

    const cartItem = {
      productId: selectedProduct.productId,
      quantity: selectedProduct.quantity,
      name: product.name,
      price: product.price,
      image: product.image
    };

    this.appState.dispatch(setState({ state: {...currentState, cart: [...currentState.cart, cartItem], isCartVisible: true}}));
    this.setLocalStorageStateData({...currentState, cart: [...currentState.cart, cartItem], isCartVisible: true});
  }

  removeFromCart(productId: string): void {
    const savedState = localStorage.getItem('appState');
    let currentState: AppState = savedState ? JSON.parse(savedState) : {
      cart: [],
      products: [],
      loading: false,
      error: null
    };

    const updatedCart = currentState.cart.filter(item => item.productId !== productId);

    this.appState.dispatch(setState({ state: {...currentState, cart: updatedCart, isCartVisible: updatedCart.length > 0}}));
    this.setLocalStorageStateData({...currentState,cart: updatedCart, isCartVisible: updatedCart.length > 0});
  } 
}
