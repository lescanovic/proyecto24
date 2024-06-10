import { Injectable } from '@angular/core';
//Servicio en la nube de autentificacion de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //inicializa funciones especificas de la base de datos

  //referenciar auth de firebase en el servicio
  constructor(public auth: AngularFireAuth) { }

  //funcion para registro
  registrar(email: string, password: string) {
    //retorna el valor que es creado con el metodo "createUser..."
    return this.auth.createUserWithEmailAndPassword(email, password);
  }



  //funcion para inicio de sesion

  iniciarsesion(email: string, password: string) {
    //valida la informacion del usuario --> saber si existe la colección
    return this.auth.signInWithEmailAndPassword(email, password)


  }

  //funcion para cerrar sesion

  cerrarsesion() {

    //devuelve una promesa vacia --> quita token
    return this.auth.signOut();


  }
  //funcion para tomar el uid


}
