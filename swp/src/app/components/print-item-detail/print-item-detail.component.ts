import { Component, inject, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { CommonModule } from '@angular/common';
import { StateDataService } from '../../services/state-data.service';
import { CartItem } from '../../interfaces/cart';

@Component({
  selector: 'app-print-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-item-detail.component.html',
  styleUrl: './print-item-detail.component.scss'
})
export class PrintItemDetailComponent implements OnInit {
  itemData = input.required<PrintItem>();
  stateService = inject(StateDataService);

  goBack() {
    window.history.back();
  }
  
  ngOnInit (): void {
    console.log('PrintItemDetailComponent initialized with item:', this.itemData());
  }

  addToCart(item: PrintItem) {
    console.log('Add to cart clicked for item:', this.itemData());
    let product : CartItem = {
      productId: String(this.itemData()._id),
      name: this.itemData().name,
      price: this.itemData().price,
      image: this.itemData().image,
      quantity: 1
    };
    this.stateService.addToCart(product);
  }
}
