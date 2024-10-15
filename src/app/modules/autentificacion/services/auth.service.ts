import { Injectable } from '@angular/core';
//Servicio en la nube de autentificacion de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

//Observable para obtener cambios
import { Observable } from 'rxjs';
//Itera coleccion leyendo informacion actual
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

//Todos los metodos que le corresponden a la autentificacion

export class AuthService {
//Propiedad privada para resguardar el rol de usuario
  private rolUsuario: string | null = null;


  //Referenciar Auth de firebase en el servicio y servicioFirestore:
constructor(
  private auth: AngularFireAuth,
  private servicioFirestore: AngularFirestore
){}
 // FUNCIÓN PARA REGISTRO
 registrar(email: string, password: string){
  // retorna el valor que es creado con el método "createEmail..."
  return this.auth.createUserWithEmailAndPassword(email, password);
}
// FUNCIÓN PARA INICIO DE SESIÓN
iniciarSesion(email: string, password: string){
  // validar la información del usuario -> saber si existe en la colección
  return this.auth.signInWithEmailAndPassword(email, password);
}

 // FUNCIÓN PARA CERRAR SESIÓN
 cerrarSesion(){
  // devuelve una promesa vacía -> quita token
  return this.auth.signOut();
}
 // FUNCIÓN PARA TOMAR EL UID
 async obtenerUid(){
  // Nos va a generar una promesa y la constante la va a capturar
  const user = await this.auth.currentUser;

  /*
    Si el usuario no respeta la estructura de la interfaz /
    Si tuvo problemas para el registro -> ej.: mal internet
  */
  if(user == null){
    return null;
  } else {
    return user.uid;
  }
}

obtenerUsuario(email: string){
  /**
   * Retornamos del servicioFirestore la colección de 'usuarios', buscamos una referencia en los email registrados
   * y los comparamos con los que ingrese el usuario al iniciar sesión, y lo obtiene con el '.get()'
   * Lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO
   */
  return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
}

obtenerRol(uid: string): Observable <string | null> {

  /*Accedemos a la coleccion de usuarios, buscando por UID, obteniendo los cambios
  en valores. Al enviar Info. por tuberia, mapeamos la coleccion, obtenemos un usuario especifico 
  y buscamos su atributo rol, aun asi este sea nulo
  */
return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
.pipe(map((usuario: any)=> usuario ? usuario.rol: null))
}

//Para enviar el rol obtenido
setUsuarioRol(rol: string){
this.rolUsuario = rol; 
}
//Para obtener el rol y asignarlo al rol de la variable local
getUsuarioRol(){

}
}
