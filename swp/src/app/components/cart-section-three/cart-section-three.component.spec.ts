import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSectionThreeComponent } from './cart-section-three.component';

describe('CartSectionThreeComponent', () => {
  let component: CartSectionThreeComponent;
  let fixture: ComponentFixture<CartSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSectionThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
