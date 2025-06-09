import { Component, input } from '@angular/core';
import { Collection } from '../../interfaces/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent {
  collection = input.required<Collection>();

  constructor(public router: Router) {
    // Initialization logic can go here if needed
  }

  navigateTo(url: string): void {
    console.warn('Navigating to:', url);
    if (url) {
      this.router.navigateByUrl(url, { state: { title: this.collection().title } });
    } else {
      console.warn('No URL provided for navigation');
    } 
  }
}
