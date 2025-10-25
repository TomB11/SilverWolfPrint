import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSectionOneComponent } from './cart-section-one.component';

describe('CartSectionOneComponent', () => {
  let component: CartSectionOneComponent;
  let fixture: ComponentFixture<CartSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSectionOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
