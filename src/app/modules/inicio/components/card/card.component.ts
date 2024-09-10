import { Component } from '@angular/core';
import { Personaje } from 'src/app/models/personaje';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],


})
export class CardComponent {


  public info: Personaje []
  constructor(){
    this.info = []
  }
}




