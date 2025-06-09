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
}
