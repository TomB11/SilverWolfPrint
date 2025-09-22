import { Component, input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  cardInfo = input.required<Card>();
  
  ngOnInit(): void {

  }
}
