import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { PrintItemDetailComponent } from "../../components/print-item-detail/print-item-detail.component";
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../../interfaces/app';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, PrintItemDetailComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {
  appState = inject(Store<{ appState: AppState }>)
  findProductSubs = new Subscription();
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

    this.findProductSubs = this.appState.pipe(
      map((state: any) => state.appState.products?.find((item: { id: number; }) => item.id === parseInt(this.id(), 10)))
    ).subscribe((product) => {
      if (product) {
        this.selectedItem = product as PrintItem;
        console.log('Selected item:', this.selectedItem);
      } else {
        console.error('Product not found with ID:', this.id());
      }
    })

    this.findProductSubs.unsubscribe();
  }
}
