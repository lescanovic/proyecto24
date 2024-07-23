import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

//importamos servicios de autentificacion

import { AuthService } from '../../services/auth.service';
//importamos componente de ruta de angular
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import * as CryptoJS from 'crypto-js';

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
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router

  ) { }
   async guardarUsuario() {
   this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
      .then(res => {
       console.log(this.usuarios);

      })
      .catch(erro => {
        console.log('Error =>', erro)
       })
      this.usuarios.password = c
  }
  async registrar() {
    
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
      //promesa
      .then(res => {
        alert("Se pudo registrar con exito")
        this.servicioRutas.navigate(['/inicio'])
      })
      //el metodo catch captura una falla y la vuelve un error cuando la promesa salga mal
      .catch(error => {
        alert("Hubo un problema al registrar un nuevo usuario :c \n" + error)
      })
    //constante uid captura el identificador de la BD
    const uid = await this.servicioAuth.obtenerUid();
    //se le asigna al atributo de la interfaz esta constante
    this.usuarios.uid = uid;

    
    //cryptojs

    
    //llamamos a la funcion guardarUsuario
    this.guardarUsuario()


   

this.limpiarInputs()
 }






  limpiarInputs(){
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
  

}
