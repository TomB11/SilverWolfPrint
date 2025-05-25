import { Component } from '@angular/core';
import { BillboardComponent } from "../../components/billboard/billboard.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BillboardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
