import { inject, Injectable, signal } from '@angular/core';
import { Collection } from '../interfaces/collection';
import jsonData from '../../../public/productsData.json';
import { PrintItem } from '../interfaces/printItem';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  http = inject(HttpClient);
  
  productsData = signal<PrintItem[]>([]);
  collections: Collection[] = [
    { id: 'col1', title: 'Organizere', url: 'products/organizere' },
    { id: 'col2', title: 'Doplnky', url: 'products/doplnky' },
    { id: 'col3', title: 'Miniatury', url: 'products/miniatury' },
    { id: 'col4', title: 'Ine', url: 'products/ine' },
  ]

  getAllProductsFromServer(): Observable<PrintItem[]> {
    console.log('getAllProductsFromServer called');
    return this.http.get<{message: string, products: PrintItem[]}>('http://localhost:3000/api/printProducts').pipe(
      map((data: any) => {
        console.log('getAllProductsFromServer Fetched products:', data);
        this.productsData.set(data.products || []);
        return this.productsData().length ? this.productsData() : jsonData;
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of(jsonData);
      })
    );
  }

  getProducts(): Observable<PrintItem[]> {
    console.log('getProducts:', this.productsData());
    return of(this.productsData());
  }
}
