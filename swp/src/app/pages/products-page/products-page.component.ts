import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  productCards: Card[] = [];
  productsTitle: string = '';

  constructor(public router: ActivatedRoute) {
    this.productCards = [
      { id: 1, title: 'Product 1', description: 'Description for Product 1', imageUrl: '' },
      { id: 2, title: 'Product 2', description: 'Description for Product 2', imageUrl: '' },
      { id: 3, title: 'Product 3', description: 'Description for Product 3', imageUrl: '' },
      { id: 4, title: 'Product 4', description: 'Description for Product 4', imageUrl: '' },
      { id: 5, title: 'Product 5', description: 'Description for Product 5', imageUrl: '' }
    ];
  }

  ngOnInit(): void {
    console.log('ProductsPageComponent initialized', this.router.snapshot);
    this.productsTitle = this.router.snapshot.data['title'] || 'Products';
  }
}
