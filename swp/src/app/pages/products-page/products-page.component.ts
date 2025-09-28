import { Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../interfaces/card';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app';
import { PrintItem } from '../../interfaces/printItem';
import { Collection } from '../../interfaces/collection';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  private orlRoute = inject(ActivatedRoute)
  state = inject(Store<{ appState: AppState }>)
  productsCard = signal<Card[]>([])
  productsTitle = signal('Products');

  ngOnInit(): void {
    this.productsTitle.set(this.orlRoute.snapshot.params['id'] || 'all');
    this.state.select('appState').subscribe((state: AppState) => {
      const foundCollection = state.collections.find((collection: Collection) => {
        return collection.title.toLowerCase() === this.productsTitle();
      });
      const collectionCode = foundCollection ? foundCollection.code : 'all';
      const filteredProducts = this.filteryByCategory(collectionCode)
      this.productsCard.set(filteredProducts);
    });
  }

  filteryByCategory(categoryCode: string): Card[] {
    let result: Card[] = [];
    this.state.select('appState').subscribe((state: AppState) => {
      if (categoryCode === 'all') {
        result = state.products.map((product: PrintItem) => ({
          id: product._id,
          title: product.name,
          description: product.description,
          imageUrl: product.image
        } as Card));
      } else {
        result = state.products
          .filter((product: PrintItem) => product.category === categoryCode)
          .map((product: PrintItem) => ({
            id: product._id,
            title: product.name,
            description: product.description,
            imageUrl: product.image
          } as Card));
      }
    }).unsubscribe();
    return result;
  }
}
