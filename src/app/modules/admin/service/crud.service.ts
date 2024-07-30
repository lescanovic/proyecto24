import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
//import{angularfirestore,angularfirestorecollection}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Definimos coleccion para los productos de la web
private productosCollection: angularfirestorecollection<Producto>
  constructor(private database = angularfirestore) { 
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
  //Editar 
  //Eliminar
 
}
