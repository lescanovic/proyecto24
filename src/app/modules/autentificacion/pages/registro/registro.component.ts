import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

//importamos servicios de autentificacion

import { AuthService } from '../../services/auth.service';
//importamos componente de ruta de angular
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  hide = true;



  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  }
  coleccionUsuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router

  ) { }
  async registrar() {
    /*
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    }
*/
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    //promesa
    .then(res =>{
      alert("Se pudo registrar con exito")
      this.servicioRutas.navigate(['/inicio'])
    })
//el metodo catch captura una falla y la vuelve un error cuando la promesa salga mal
    .catch(error =>{
      alert("Hubo un problema al registrar un nuevo usuario :c \n"+error)
    })












    //Registro con servicio
    // this.coleccionUsuarios.push(credenciales)



  }



}
