import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {angularfirestore,angularfirestorecollection}


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
/**/
private usuariosCollection: AngularFirestoreCollection<Usuario>
  constructor() { }
}
