import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSectionTwoComponent } from './cart-section-two.component';

describe('CartSectionTwoComponent', () => {
  let component: CartSectionTwoComponent;
  let fixture: ComponentFixture<CartSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSectionTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
