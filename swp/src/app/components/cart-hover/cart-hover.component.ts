import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-hover',
  imports: [CommonModule, ],
  templateUrl: './cart-hover.component.html',
  styleUrl: './cart-hover.component.scss'
})
export class CartHoverComponent implements OnInit, OnDestroy {
  cartDataInStore = inject(Store<{ appState: AppState }>);
  router = inject(Router);
  isCartVisible = signal(false);
  cartCounterValue = signal(0);
  private cartSubs = new Subscription();

  ngOnInit(): void {
    this.cartSubs = this.cartDataInStore.select('appState').subscribe((state) => {
      console.log('Cart state updated:', state);
      this.isCartVisible.set(state.isCartVisible);
      this.cartCounterValue.set(
        state.cart.reduce((total: any, item: { quantity: any }) => total + item.quantity, 0)
      );
    });
  }

  enterToCartPage() {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.cartSubs.unsubscribe();
  }
}
