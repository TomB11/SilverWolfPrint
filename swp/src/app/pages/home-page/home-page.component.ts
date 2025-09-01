import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
import { StateDataService } from '../../services/state-data.service';
import { selectProducts } from '../../state/appState/appState.selectors';
import { take } from 'rxjs/operators';
import { AppSignalStore } from '../../store/app.store';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BillboardComponent, CardComponent, CollectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  sectionNewCards = signal<Card[]>([]);
  sectionFavoritesCards = signal<Card[]>([]);
  sectionCollectionsCards = signal<Collection[]>([]); 
  productsLoaded = false;

  appSignalStore = inject(AppSignalStore);
  appState = inject(Store<{ appState: AppState }>)
  apiService = inject(ApiCallsService);
  stateDataService = inject(StateDataService);
  products$: any

  constructor() { 
    this.sectionCollectionsCards.set(this.apiService.collections);
  }

  ngOnInit(): void {
    console.log('HomePageComponent initialized', this.appSignalStore.app());

    if (this.stateDataService.isLocalStorageFullfilled()) {
      const state: AppState | null = this.stateDataService.getStateData();
      if (state) {
        console.log('State loaded from localStorage:', state);
        this.setAllSections(false, state.products);
      } else {
        console.warn('No valid state found in localStorage');
        this.productsLoaded = false;
      }
    } else {
      this.products$ = this.appState.select(selectProducts).pipe(take(1)).subscribe(products => {
        console.log('Products from store:', products);
        if (!products || products.length === 0) {
          this.appState.dispatch(loadProducts());
          console.log('this.apiService.productsData:', this.apiService.productsData());
          if (this.apiService.productsData().length > 0) {
              this.setAllSections(true, this.apiService.productsData());
            } else {
              this.productsLoaded = false;
            }
        } else {
          console.log('Products found:', this.apiService.productsData());
          this.productsLoaded = true;
        }
      }, error => {
        console.error('Error loading products:', error || 'Unknown error');
        this.productsLoaded = false;
      })
    }
  }

  setAllSections(needToSaveToLS: boolean, productsData: PrintItem[]) {
    if (productsData.length > 0) {
      if (needToSaveToLS) {
        const state: AppState = {
          products: productsData,
          cart: [],
          loading: false,
          error: null
        };
        this.stateDataService.setLocalStorageStateData(state);
      }
      this.productsLoaded = true;
      this.sectionNewCards.set(this.fillSectionsWithProducts(productsData).slice(3, 9));
      this.sectionFavoritesCards.set(this.fillSectionsWithProducts(productsData).slice(0, 6));
    }
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

  ngOnDestroy(): void {
    this.products$?.unsubscribe();
  }
}
