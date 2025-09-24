import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHoverComponent } from './cart-hover.component';

describe('CartHoverComponent', () => {
  let component: CartHoverComponent;
  let fixture: ComponentFixture<CartHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
