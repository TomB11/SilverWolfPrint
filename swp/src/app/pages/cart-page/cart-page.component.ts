import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CartItem } from '../../interfaces/cart';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  http = inject(httpResource)

  cartItems = signal<CartItem[]>([
    { productId: '1', name: 'Product 1', price: 100, image: null, quantity: 2 },
    { productId: '2', name: 'Product 2', price: 200, image: null, quantity: 1 },
  ]);
  cartTotal = this.cartItems().reduce((total, item) => total + item.price, 0);

  ngOnInit() {
    // Fetch cart items from a service or state management
    // this.cartItems = this.cartService.getCartItems();
    // this.updateCartTotal();
    const loadCart = httpResource<CartItem[]>(() => ({
        url: 'http://localhost:3000/api/cart',
        method: 'GET'
      }),
      {
        parse: (value: unknown) => {
          const response = value as CartItem[];
          this.cartItems.set(response);
          return response;
        }
      }
    );
  }

}
