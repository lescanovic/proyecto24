import { Component } from '@angular/core';
import { Personaje } from 'src/app/models/personaje';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
public info:Personaje  [];
constructor(){
  this.info= [
    {
      id: "",
      nombre: "Harry Potter",
      edad:5,
      imagen:"https://hips.hearstapps.com/hmg-prod/images/harry-potter-and-the-sorcerer-s-stone-1613738695.jpg?crop=1.00xw:0.854xh;0,0.0693xh",
      alt:"Harry "                                                                                                                         
  
    },
   {
    id:"",
    nombre:"Ron",
    edad:4,
    imagen:"https://hips.hearstapps.com/hmg-prod/images/ron-weasley-harry-potter-1551702278.jpg?crop=0.743xw:1.00xh;0.129xw,0&resize=1200:*",
    alt:"Ron"

   }
  ]
}
}
