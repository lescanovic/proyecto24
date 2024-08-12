import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logueado = true; //Booleana para manejo de registro y el inicio sesion
  deslogueado = false ; //Booleana para manejo de cierre de sesion
constructor(
  public servicioAuth: AuthService,
  public servicioRutas : Router
){}
ingresar(){

  //Cuando lo toquemos le va a cambiar los valores, entonces se va a mostrar el desloguearse y el loguearse se ocultara

this.logueado = false
this.deslogueado = true
}

cerrarSesion(){
  //vuelvo a invertir los valores
  this.deslogueado = false 
  this.logueado = true

  //llamo al metodo cerrar sesion para limpiar el token
  this.servicioAuth.cerrarSesion()

this.servicioRutas.navigate(['/']) ; //nos redirigimosa la raiz del sitio con el metodo navigate 
}
}
