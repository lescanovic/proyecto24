import { Component } from '@angular/core';

//IMPORTAMOS INTERFAZ
import { Personaje } from 'src/app/models/personaje';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],


})
export class CardComponent {
 //PROPIEDAD PUBLICA TIPO ARRAY
 public info: Personaje [] ;
 constructor(){
  this.info = [ 
{
  id: "",
  nombre: "Harry Potter",
  edad: 11,
  imagen: "https://hips.hearstapps.com/hmg-prod/images/in-arrivo-reboot-film-harry-potter-nuovi-attori-1672747363.png?crop=0.611xw:1.00xh;0.111xw,0&resize=640:*",
  alt: 'Harry '
},
{
  id: '',
  nombre: 'Ron Weasly',
  edad: 11,
  imagen: 'https://caracoltv.brightspotcdn.com/dims4/default/c37eec7/2147483647/strip/false/crop/700x484+0+0/resize/1200x829!/quality/90/?url=https%3A%2F%2Fcaracol-brightspot.s3-us-west-2.amazonaws.com%2Fassets%2Fshock%2Fcontent_files%2F2015_08%2Fgallery%2Fronw0.jpg',
  alt: 'Ron'
},
{
  id: '',
  nombre: 'Hermione Granger',
  edad:11,
  imagen: 'https://i.pinimg.com/736x/66/37/00/663700f6077c91f7076157572d8e2d3e.jpg',
  alt: 'Hermione'
}


] 
 }
}
