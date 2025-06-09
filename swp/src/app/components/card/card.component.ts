import { Component, input } from '@angular/core';
import { Card } from '../../interfaces/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cardInfo = input.required<Card>();
  
  constructor() {

  }
}
