import { Component, inject } from '@angular/core';
import { BillboardComponent } from "../../components/billboard/billboard.component";
import { CardComponent } from "../../components/card/card.component";
import { ApiCallsService } from '../../services/api-calls.service';
import { Card } from '../../interfaces/card';
import { CommonModule } from '@angular/common';
import { Collection } from '../../interfaces/collection';
import { CollectionComponent } from "../../components/collection/collection.component";
import { PrintItem } from '../../interfaces/printItem';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../state/appState/appState.actions';
import { AppState } from '../../interfaces/app';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BillboardComponent, CardComponent, CollectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  newsCards: Card[] = [];
  favoritesCards: Card[] = [];
  collectionsCards: Collection[] = [];
  appState = inject(Store<{ appState: AppState }>)

  constructor(public apiService: ApiCallsService) { 
    this.newsCards = this.fillSectionsWithProducts(apiService.productsData).slice(3, 9);
    this.favoritesCards = this.fillSectionsWithProducts(apiService.productsData).slice(0, 6);
    this.collectionsCards = apiService.collections;
    this.appState.dispatch(loadProducts());
  }

  fillSectionsWithProducts(jsonData: PrintItem[]) {
    const sortedItems: Card[] = jsonData.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description,
      imageUrl: item.image
    }));

    return sortedItems
  }
}
