import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//importamos servicios de autentificacion
import { AuthService } from '../../services/auth.service';
//importamos servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
//importamos componente de ruta de angular
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
// paquetería de alertas personalizadas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  {
  // input de la contraseña para ver los cáracteres o no
  hide = true;

  // IMPORTAR LA INTERFAZ DE USUARIO -> INICIALIZAR
  usuarios: Usuario = {
    uid: '', // -> inicializamos con comillas simples porque es tipo STRING
    nombre: '',
    apellido: '',
    email: '',
    rol: 'visitante', //Cada vez que se registre un usuario, por defecto van a ser visitantes
    password: ''
  }

  // CREAMOS COLECCIÓN DE USUARIOS, TIPO 'USUARIO' PARA ARRAYS
  coleccionUsuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}

  // FUNCIÓN PARA EL REGISTRO DE NUEVOS USUARIOS
  async registrar(){
    // constante credenciales va a resguardar la información que ingrese el usuario

    // REGISTRO CON SERVICIO DE AUTH
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    
    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    // el método THEN es una promesa que devuelve el mismo valor si todo sale bien
    .then(res => {
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "¡Se pudo registrar con éxito! :)",
        icon: "success"
      });

      // el método NAVIGATE nos redirecciona a otra vista
      this.servicioRutas.navigate(['/inicio']);
    })
    // el método CATCH captura una falla y la vuelve un error cuando la promesa salga mal
    .catch(error => {
      Swal.fire({
        title: "¡Oh no!",
        text: "Hubo un error al registrar un nuevo usuario :( \n"+error,
        icon: "error"
      });
    })

    // Constante UID captura el identificado de la BD
    const uid = await this.servicioAuth.obtenerUid();

    // Se le asigna al atributo de la interfaz esta constante
    this.usuarios.uid = uid;

    /**
     * SHA-256: Es un algoritmo de hash seguro que toma una entrada (en este caso la contraseña)
     * y produce una cadena de caracteres HEXADECIMAL que va a representar a su hash
     * toString: Convierte el resultado en la cadena de caracteres legible
     */
    this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();

    // Llamamos a la función guardUsuario()
    this.guardarUsuario();

    // Llamamos a la función limpiarInputs() para ejecutarla
    this.limpiarInputs();


  }

  /* Función que accede a servicio FIRESTORE y envía la información 
    agrega junto al UID
  */
  async guardarUsuario(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      console.log(this.usuarios);
    })
    .catch(err => {
      console.log('Error => ', err);
    })
  }

  // Función para vaciar los inputs del formulario
  limpiarInputs(){
    /*
    En constante "inputs" llamamos a los atributos y los inicializamos 
    como vacíos (string = '', number = 0)
    */
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = 'visitante',
      password: this.usuarios.password = ''
    }
  }
}

