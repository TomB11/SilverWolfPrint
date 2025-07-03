import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cartItems = [
    { id: 1, name: 'Product 1', price: 100, image: null },
    { id: 2, name: 'Product 2', price: 200, image: null },
  ];
  public cartTotal = this.cartItems.reduce((total, item) => total + item.price, 0);

}
