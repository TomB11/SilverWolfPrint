import { Injectable } from '@angular/core';
import { Collection } from '../interfaces/collection';
import jsonData from '../../../public/productsData.json';
import { PrintItem } from '../interfaces/printItem';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  productsData: PrintItem[] = jsonData

  collections: Collection[] = [
    { id: 'col1', title: 'Organizere', url: 'products/organizere' },
    { id: 'col2', title: 'Doplnky', url: 'products/doplnky' },
    { id: 'col3', title: 'Miniatury', url: 'products/miniatury' },
    { id: 'col4', title: 'Ine', url: 'products/ine' },
  ]

  constructor() { }

  getProducts(): Observable<PrintItem[]> {
    return of(this.productsData); // or return this.http.get<PrintItem[]>('...');
  }
}
