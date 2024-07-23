import { Injectable } from '@angular/core';
//Servicio en la nube de autentificacion de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import {angularFirestore} from '.angular/fire/compat/firestore'; 

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
async obtenerUid(){
  //Nos va a generar una promesa y la constante la va a capturar
  const user = await this.auth.currentUser; 

  /*Si el usuario no respeta la estructura de la interfaz, o si tuvo problemas para el registro, ejem: mal internet*/
  if(user ==null){
    return null;
  }else{
    return user.uid
  }
}

}
obtenerUsuario(email:string){
return this.servicioFirestore.collection('usuarios',ref => ref.where('email' , '==','email'.length().toPromise()))
}