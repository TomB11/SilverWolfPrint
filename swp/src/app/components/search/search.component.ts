import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app';
import { Router } from '@angular/router';
import { FocusOffDirective } from '../../directives/focus-off.directive';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FocusOffDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  public searchResults = signal<PrintItem[]>([]);
  searched = signal(false);
  appState = inject(Store<{ appState: AppState }>);
  routeNav = inject(Router);

  onSearch(query: string): void {
    if (query.trim() === '') {
      this.searchResults.set([]);
      this.searched.set(false);
      return;
    }

    this.searched.set(true);
    this.appState.select(state => state.appState.products)
      .subscribe(products => {
        this.searchResults.set(products.filter((item: PrintItem) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        ));
      });
  }

  clickResultItem(result: PrintItem): void {
    this.searched.set(false);
    this.searchResults.set([]);
    this.routeNav.navigate(['/detail', result.id]);
  }

  closeSearch(): void {
    this.searched.set(false);
    this.searchResults.set([]);
    this.searchInput.nativeElement.value = '';
    console.log('Search closed');
  }
}
