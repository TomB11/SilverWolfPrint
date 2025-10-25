import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalInformation } from '../../interfaces/perosnalInfromation';

@Component({
  selector: 'app-cart-section-one',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart-section-one.component.html',
  styleUrl: './cart-section-one.component.scss'
})
export class CartSectionOneComponent {
  @Output() formSubmit = new EventEmitter<PersonalInformation>();
  cartForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
  });

  get invalidEmail() {
    const emailControl = this.cartForm.get('email');
    return emailControl?.touched && emailControl?.invalid && emailControl?.errors?.['email'];
  }

  private handleFormSubmit() {
    if (this.cartForm.valid) {
      this.formSubmit.emit(this.cartForm.value as PersonalInformation);
    } else {
      console.log('Form is invalid');
    }
  }

  // new: public method parent can call
  public submitFromParent() {
    this.handleFormSubmit();
  }
}
