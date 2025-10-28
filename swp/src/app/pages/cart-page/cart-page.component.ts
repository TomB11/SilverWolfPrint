import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CartItem } from '../../interfaces/cart';
import { CartSectionOneComponent } from '../../components/cart-section-one/cart-section-one.component';
import { CartSectionTwoComponent } from '../../components/cart-section-two/cart-section-two.component';
import { CartSectionThreeComponent } from '../../components/cart-section-three/cart-section-three.component';
import { PersonalInformation } from '../../interfaces/perosnalInfromation';
import { FormsModule } from '@angular/forms';
import { StateDataService } from '../../services/state-data.service';

@Component({
  selector: 'app-cart-page',
  imports: [
    CommonModule,
    FormsModule,
    CartSectionOneComponent,
    CartSectionTwoComponent,
    CartSectionThreeComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit, OnDestroy {
  @ViewChild('sectionOne') sectionOne!: CartSectionOneComponent;
  stateService = inject(StateDataService);
  cartItems = signal<CartItem[]>([
    { productId: '1', name: 'Product 1', price: 100, image: null, quantity: 2 },
    { productId: '2', name: 'Product 2', price: 200, image: null, quantity: 1 },
  ]);
  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
  );
  activesection = signal(0)
  personalForm = signal<PersonalInformation | null>(null);

  ngOnInit() {
    // Fetch cart items from a service or state management
    this.cartItems.set(this.stateService.getCartItems())
  }

  get btnTitle(): string {
    return this.activesection() === 3 ? 'Objednat' : 'Dalej';
  }

  get currancyNumber(): number {
    return this.cartTotal();
  }

  setPersonalInfo(formData: PersonalInformation) {
    this.personalForm.set(formData);
  }

  toNextSection() {
    if (this.activesection() == 1 && this.sectionOne) {
      this.sectionOne.submitFromParent();
    }

    if (this.activesection() < 3) {
      this.activesection.set(this.activesection() + 1);
    } else {
      // Finalize order
      console.log('Finalizing order with data:', {
        personalInformation: this.personalForm(),
        cartItems: this.cartItems(),
        totalAmount: this.cartTotal()
      });
    }
  }

  removeItem(item: CartItem) {
    // const updatedCart = this.cartItems().filter(cartItem => cartItem.productId !== item.productId);
    // this.cartItems.set(updatedCart);
    this.stateService.removeFromCart(item.productId);
    this.cartItems.set(this.stateService.getCartItems());
  }

  ngOnDestroy(): void {
    // Cleanup if necessary
  }
}
