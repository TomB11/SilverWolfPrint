import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cartItems = signal([
    { id: 1, name: 'Product 1', price: 100, image: null },
    { id: 2, name: 'Product 2', price: 200, image: null },
  ]);
  cartTotal = this.cartItems().reduce((total, item) => total + item.price, 0);

}
