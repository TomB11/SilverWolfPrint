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
import { loadCollections, loadProducts } from '../../state/appState/appState.actions';
import { AppState } from '../../interfaces/app';
import { StateDataService } from '../../services/state-data.service';
import { selectCollections, selectProducts } from '../../state/appState/appState.selectors';
import { concatMap, filter, take, withLatestFrom } from 'rxjs/operators';
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

  ngOnInit(): void {
    if (this.tryLoadFromLocalStorage()) return;
    this.loadCollectionsAndProducts()
  }

  private tryLoadFromLocalStorage(): boolean {
    if (!this.stateDataService.isLocalStorageFullfilled()) return false;
    const state: AppState | null = this.stateDataService.getStateData();
    if (state) {
      this.setAllSections(false, state);
      return true;
    } else {
      this.productsLoaded = false;
      return false;
    }
  }

  loadCollectionsAndProducts(): void {
    this.appState.select(selectCollections).pipe(
      take(1),
      concatMap(collections => {
        if (!collections || collections.length === 0) {
          this.appState.dispatch(loadCollections());
          const apiCollections = this.apiService.collections();
          if (apiCollections.length > 0) {
            this.sectionCollectionsCards.set(apiCollections);
          } else {
            this.sectionCollectionsCards.set([]);
          }
        } else {
          this.sectionCollectionsCards.set(collections);
        }

        this.appState.select(selectProducts).pipe(take(1)).subscribe(products => {
          if (!products || products.length === 0) {
            this.appState.dispatch(loadProducts());
          }
        });
        
        return this.appState.select(selectProducts).pipe(
          filter(products => !!products && products.length > 0),
          take(1),
          withLatestFrom(this.appState.select((state) => state.appState))
        );
      })
    ).subscribe(([products, state]) => {
      this.productsLoaded = true;
      this.setAllSections(true, state);
    });
  }

  setAllSections(needToSaveToLS: boolean, stateData: AppState) {
    if (stateData.products.length > 0) {
      if (needToSaveToLS) {
        const state: AppState = {
          products: stateData.products,
          collections: stateData.collections,
          cart: [],
          loading: false,
          error: null
        };
        this.stateDataService.setLocalStorageStateData(state);
      }
      this.productsLoaded = true;
      this.sectionCollectionsCards.set(stateData.collections);
      this.sectionNewCards.set(this.fillSectionsWithProducts(stateData.products).slice(3, 9));
      this.sectionFavoritesCards.set(this.fillSectionsWithProducts(stateData.products).slice(0, 6));
    }
  }

  fillSectionsWithProducts(jsonData: PrintItem[]) {
    const sortedItems: Card[] = jsonData.map((item: any) => ({
      id: item._id,
      title: item.name,
      description: item.description,
      imageUrl: item.image
    }));

    return sortedItems
  }

  ngOnDestroy(): void {
  }
}
