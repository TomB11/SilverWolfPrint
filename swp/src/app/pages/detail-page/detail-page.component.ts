import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { PrintItem } from '../../interfaces/printItem';
import { PrintItemDetailComponent } from "../../components/print-item-detail/print-item-detail.component";
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../../interfaces/app';
import { StateDataService } from '../../services/state-data.service';

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

  constructor(private stateDataService: StateDataService) {
    this.stateDataService.getStateData();
  }

  ngOnInit(): void {
    console.log('DetailPageComponent initialized with ID:', this.id());
    console.log('DetailPageComponent state', this.appState);

    this.findProductSubs = this.appState.pipe(
      map((state: any) => state.appState.products?.find((item: { id: number; }) => item.id === parseInt(this.id(), 10)))
    ).subscribe((product) => {
      if (product) {
        this.selectedItem = product as PrintItem;
      }
    })

    this.findProductSubs.unsubscribe();
  }
}
