import { Component, input } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-item-detail.component.html',
  styleUrl: './print-item-detail.component.scss'
})
export class PrintItemDetailComponent {
  itemData = input.required<PrintItem>();

  goBack() {
    window.history.back();
  }

  addToCart(item: PrintItem) {
    console.log('Add to cart clicked for item:', this.itemData());
    // Implement add to cart functionality here
  }
}
