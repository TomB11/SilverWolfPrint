import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { PrintItemDetailComponent } from "../../components/print-item-detail/print-item-detail.component";

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, PrintItemDetailComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {
  id = input.required<string>();
  selectedItem: PrintItem = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0
  };

  ngOnInit(): void {
    console.log('DetailPageComponent initialized with ID:', this.id());

    
  }
}
