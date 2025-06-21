import { Component, inject, OnInit } from '@angular/core';
import { BillboardComponent } from "../../components/billboard/billboard.component";
import { CardComponent } from "../../components/card/card.component";
import { ApiCallsService } from '../../services/api-calls.service';
import { Card } from '../../interfaces/card';
import { CommonModule } from '@angular/common';
import { Collection } from '../../interfaces/collection';
import { CollectionComponent } from "../../components/collection/collection.component";
import { PrintItem } from '../../interfaces/printItem';
import { Store } from '@ngrx/store';
import { loadProducts, setState } from '../../state/appState/appState.actions';
import { AppState } from '../../interfaces/app';
import { StateDataService } from '../../services/state-data.service';
import { selectAppState } from '../../state/appState/appState.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BillboardComponent, CardComponent, CollectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  newsCards: Card[] = [];
  favoritesCards: Card[] = [];
  collectionsCards: Collection[] = [];
  appState = inject(Store<{ appState: AppState }>)

  constructor(public apiService: ApiCallsService, public stateDataService: StateDataService) { 
    this.collectionsCards = apiService.collections;
  }

  ngOnInit(): void {
    if (this.stateDataService.isSessionStorageFullfilled()) {
      this.stateDataService.getStateData();
      this.setAllSections(false)
    } else {
      this.appState.dispatch(loadProducts());
      this.setAllSections(true)
    }
  }

  setAllSections(needToSaveToLS: boolean) {
    const sub = this.appState.select(selectAppState).pipe(
      map((state: AppState) => state.products)
    ).subscribe((productsData: any) => {
      if (productsData.length > 0) {
        if (needToSaveToLS) {
          const state: AppState = {
            products: productsData,
            cart: [],
            loading: false,
            error: null
          };
          this.stateDataService.setSessionStorageStateData(state);
        }
        this.newsCards = this.fillSectionsWithProducts(productsData).slice(3, 9);
        this.favoritesCards = this.fillSectionsWithProducts(productsData).slice(0, 6);
      }
    });
    sub.unsubscribe();
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
