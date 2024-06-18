import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
 /* public info: Usuario[];
  constructor() {
    this.info = []
  }
*/

constructor(
  public servicioAuth:AuthService,
  public servicioFirestore: FirestoreService,
  public servicioRutas: Router
){}
async iniciarsesion(){
  const credenciales = {
    email: this.usuarios.email,
    password:this.usuarios.password
  }
  const res = await this.servicioAuth.iniciarsesion(credenciales.email, credenciales.password)
  .then(res => {
    alert("¡Se pudo ingresar con exito!");
    this.servicioRutas.navigate(['/inicio']);
  })
  .catch(err => {
    alert("Hubo un problema :c"+err);
    this.limpiarInputs();
  })
}

}
