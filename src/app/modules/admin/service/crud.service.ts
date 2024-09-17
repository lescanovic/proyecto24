import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

//importaciones para manejo de archivos y referencias
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';
/*
  getDownloadURL: para obtener la URL de descarga de una imagen subida
  getStorage: Para obtener la instancia de almacenamiento
  ref: Para crear referencias a ubicaciones en el almacenamiento
  UploadResult: tipo que representa el resultado de una operacion subida
  UploadString:Para subir imagenes en formato de cadena
  deleteObject: Para eliminar un espacio de almacenamiento


*/
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Definimos coleccion para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  private respuesta!: UploadResult

  //se le agrega un signo de exclamacion para que pueda recbir valores vacios en un comienzo


  //Inicializar servicio de storage
  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto')
  }

  //Crear productos

  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //Creamos numero identificativo para el producto en la base de datos
        const idproducto = this.database.createId()
        //asignamos ID creado al atributo idProducto a la interfaz producto
        producto.idProducto = idproducto;

        //Asignamos URL recibida del parametro al atributo "imagen" de interfaz de producto
        producto.imagen = url;


        const resultado = await this.productosCollection.doc(idproducto).set(producto)
        resolve(resultado)
      } catch (error) {
        reject(error);
      }
    })
  }
  //Obtener
  obtenerProducto() {
    //para obtener los productos que subamos a nuestra base de datos

    //funciona como una captura de datos

    /*
     snapshotChanges => toma captura del estado de los datos
     pipe => tuberías que retornan un nuevo arreglo
     map => "mapea" o recorre esa nueva información
     a => resguarda la nueva información y la envía como un documento 
   */

    return this.productosCollection.snapshotChanges()
      .pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  //Editar 
  modificarProducto(idProducto: string, nuevaData: Producto) {
    /*Accedemos a la coleccion productos de la base de datos 
    buscamos el id del producto seleccionado y lo actualizamos con el metodo
    "update" enviando la nueva informacion
    */
    return this.database.collection('productos').doc(idProducto).update(nuevaData);
  }




  //Eliminar
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        const storage = getStorage() //Referenciamos nuevamente a la base de datos storage

        const referenciaImagen= ref(storage,imagenUrl) //Obtiene la Referencia desde el almacenamiento de storage

        //Eliminamos la imagen desde el almacenamiento
        deleteObject(referenciaImagen)
        .then((res) =>{
          const respuesta = this.productosCollection.doc(idProducto).delete();
          resolve(respuesta);
        })
        .catch(error=>{
          reject("Error al eliminar la imagen:\n"+error)
        })

     
      }
      catch (error) {
        reject(error);
      }
    })
  }

  //OBTENER la URL de las imagenes 
  //Recibira como parametro la respuesta que tenemos arriba osea: 
  obtenerUrlImagen(respuesta: UploadResult) {
    //Retorna URL obtenida como REFERENCIA 
    return getDownloadURL(respuesta.ref)

  }

  /**
   * 
   * @param {string} nombre <-nombre de la imagen
   * @param {any}imagen <- tipo de imagenes que se pueden subir
   * @param {string} ruta <- ruta de almacenamiento de las imagenes
   * @returns <-se retorna lo obtenido
   */





  //SUBIR imagenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    try {
      //Crear una referencia de imagen
      //Accede a storage  (almacenamiento), ruta (carpeta), nombre (nombre de imagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre)

      //Le asignamos a la respuesta la informacion de la imagen subida
      this.respuesta = await uploadString(referenciaImagen, nombre, 'data_url')
        .then(res => {
          return res;
        })

      return this.respuesta
    }
    catch (error) {
      console.log(error)


      return this.respuesta
    }
  }

}
