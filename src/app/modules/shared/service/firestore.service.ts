import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
/**/
private usuariosCollection: AngularFirestoreCollection<Usuario>
constructor(private database: AngularFirestore) {
  /*
  usuariosCollection va a definir la nueva colección 'usuarios' que estará en nuestra 
  base de datos 
  */
  this.usuariosCollection = this.database.collection<Usuario>('usuarios');
}
agregarUsuario(usuario: Usuario, id: string){
  /*
    Creamos una nueva PROMESA junto los métodos:
    RESOLVE: promesa resuelta -> funciona correctamente
    REJECT: promesa rechazada -> ocurrió una falla
  */

  return new Promise(async (resolve, reject) => {
    // Bloque TRY encapsula la lógica RESUELTA
    try {
      usuario.uid = id;

      /**
       * const resultado = colección de usuarios, envía como número de documento el UID
       * y setea la información que ingresamos en el formulario de REGISTRO
       */

      const resultado = await this.usuariosCollection.doc(id).set(usuario);

      resolve (resultado);
      // Bloque CATCH encapsula la lógica RECHAZADA
    } catch (error) {
      // captura una falla y la vuelve un 'error'
      reject (error);
    }
  })
}
}
