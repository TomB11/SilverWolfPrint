import { Component } from '@angular/core';
import { BillboardComponent } from "../../components/billboard/billboard.component";
import { CardComponent } from "../../components/card/card.component";
import { ApiCallsService } from '../../services/api-calls.service';
import { Card } from '../../interfaces/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BillboardComponent, CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  newsCards: Card[] = [];
  favoritesCards: Card[] = [];
  accesoriesCards: Card[] = [];

  constructor(public apiService: ApiCallsService) { 
    // Initialization logic can go here if needed
    this.newsCards = apiService.dummyData.slice(0, 3);
    this.favoritesCards = apiService.dummyData.slice(3, 6);
  }
}
