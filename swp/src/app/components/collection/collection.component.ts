import { Component, inject, input, OnInit } from '@angular/core';
import { Collection } from '../../interfaces/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
  collection = input.required<Collection>();
  router = inject(Router);

  ngOnInit(): void {
    
  }

  navigateTo(url: string): void {
    if (url) {
      const urlPath = url.toLowerCase()
      this.router.navigateByUrl(urlPath, { state: { title: this.collection().title.toLowerCase() } });
    } else {
      console.warn('No URL provided for navigation');
    } 
  }
}
