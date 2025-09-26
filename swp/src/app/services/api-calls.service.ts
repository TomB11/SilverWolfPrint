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
  collections = signal<Collection[]>([]);
  defaultCollections: Collection[] = [
    { id: 'col1', title: 'Organizer', code: '1' },
    { id: 'col2', title: 'Accesories', code: '2' },
    { id: 'col3', title: 'Miniatures', code: '3' },
    { id: 'col4', title: 'Others', code: '4' }
  ]

  getAllProductsFromServer(): Observable<PrintItem[]> {
    return this.http.get<{message: string, products: PrintItem[]}>('http://localhost:3000/api/printProducts').pipe(
      map((data: any) => {
        this.productsData.set(data.products || []);
        return this.productsData().length ? this.productsData() : jsonData;
      }),
      catchError((error) => {
        return of(jsonData);
      })
    );
  }

  getCollectionsFromServer(): Observable<Collection[]> {
    return this.http.get<{message: string, collections: Collection[]}>('http://localhost:3000/api/collections').pipe(
      map((data: any) => {
        this.collections.set(data.collections || this.defaultCollections);
        return this.collections();
      }),
      catchError((error) => {
        this.collections.set(this.defaultCollections);
        return of(this.collections());
      })
    )
  }

  getProducts(): Observable<PrintItem[]> {
    return of(this.productsData());
  }
}
