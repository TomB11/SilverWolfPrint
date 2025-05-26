import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  dummyData: Card[] = [
    { id: '1', title: 'Card 1', description: 'This is the first card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Card 2', description: 'This is the second card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Card 3', description: 'This is the third card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Card 4', description: 'This is the fourth card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Card 5', description: 'This is the fifth card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Card 6', description: 'This is the sixth card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '7', title: 'Card 7', description: 'This is the seventh card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '8', title: 'Card 8', description: 'This is the eighth card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '9', title: 'Card 9', description: 'This is the ninth card.', imageUrl: 'https://via.placeholder.com/150' },
    { id: '10', title: 'Card 10', description: 'This is the tenth card.', imageUrl: 'https://via.placeholder.com/150' }
  ];

  constructor() { }
}
