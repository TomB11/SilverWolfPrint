import { Component, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-item-detail.component.html',
  styleUrl: './print-item-detail.component.scss'
})
export class PrintItemDetailComponent implements OnInit {
  itemData = input.required<PrintItem>();

  goBack() {
    window.history.back();
  }
  
  ngOnInit (): void {
    console.log('PrintItemDetailComponent initialized with item:', this.itemData());
  }

  addToCart(item: PrintItem) {
    console.log('Add to cart clicked for item:', this.itemData());
    // Implement add to cart functionality here
  }
}
