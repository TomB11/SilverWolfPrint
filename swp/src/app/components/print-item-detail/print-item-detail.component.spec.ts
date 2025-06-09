import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemDetailComponent } from './print-item-detail.component';

describe('PrintItemDetailComponent', () => {
  let component: PrintItemDetailComponent;
  let fixture: ComponentFixture<PrintItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintItemDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
