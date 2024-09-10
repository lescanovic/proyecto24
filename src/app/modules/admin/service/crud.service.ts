import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import{AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Definimos coleccion para los productos de la web
private productosCollection: AngularFirestoreCollection<Producto>
  constructor(private database: AngularFirestore) { 
    this.productosCollection = database.collection('producto')
  }

  //Crear productos

  crearProducto(producto:Producto){
return new Promise (async(resolve,reject)=>{
  try{
    //Creamos numero identificativo para el producto en la base de datos
    const idproducto = this.database.createId()
    //asignamos ID creado al atributo idProducto a la interfaz producto
     producto.idProducto = idproducto;

    const resultado = await this.productosCollection.doc(idproducto).set(producto)
    resolve(resultado)
  }catch (error){
    reject(error);
  }
})
  }
  //Obtener
  obtenerProducto(){
    //para obtener los productos que subamos a nuestra base de datos

    //funciona como una captura de datos

     /*
      snapshotChanges => toma captura del estado de los datos
      pipe => tuberías que retornan un nuevo arreglo
      map => "mapea" o recorre esa nueva información
      a => resguarda la nueva información y la envía como un documento 
    */
   
    return this.productosCollection.snapshotChanges()
    .pipe(map(action =>action.map(a => a.payload.doc.data())))
    }
  //Editar 
modificarProducto(idProducto:string, nuevaData: Producto){
  /*Accedemos a la coleccion productos de la base de datos 
  buscamos el id del producto seleccionado y lo actualizamos con el metodo
  "update" enviando la nueva informacion
  */
return this.database.collection('productos').doc(idProducto).update(nuevaData);
}




  //Eliminar
eliminarProducto(idProducto:string){
return new Promise((resolve, reject) => {
  try{
    const respuesta = this.productosCollection.doc(idProducto).delete();
    resolve(respuesta);
  }
  catch(error){
    reject(error);
  }
})
}
 
}
