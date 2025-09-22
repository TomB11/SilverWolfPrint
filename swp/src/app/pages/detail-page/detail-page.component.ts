import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { PrintItemDetailComponent } from "../../components/print-item-detail/print-item-detail.component";
import { Store } from '@ngrx/store';
import { filter, map, Subscription, take } from 'rxjs';
import { AppState } from '../../interfaces/app';
import { StateDataService } from '../../services/state-data.service';
import { CartItem } from '../../interfaces/cart';
import { selectProducts } from '../../state/appState/appState.selectors';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, PrintItemDetailComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {
  appState = inject(Store<{ appState: AppState }>)
  stateDataService = inject(StateDataService);

  findProductSubs = new Subscription();
  id = input.required<string>();
  selectedItem: PrintItem = {
    _id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0
  };

  ngOnInit(): void {
    this.stateDataService.getStateData();
    this.findProductSubs = this.appState.select(selectProducts).pipe(
      filter(product => product.length > 0),
      map(product => {
        return product.find(item => String(item._id) === this.id())
      }),
      take(1)
    ).subscribe(product => {
      if (product) {
        this.selectedItem = product as PrintItem;
      }
    })
  }

  addToCart() {
    let product : CartItem = {
      productId: String(this.selectedItem._id),
      name: this.selectedItem.name,
      price: this.selectedItem.price,
      image: this.selectedItem.image,
      quantity: 1
    };
    this.stateDataService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.findProductSubs.unsubscribe();
  }
}
