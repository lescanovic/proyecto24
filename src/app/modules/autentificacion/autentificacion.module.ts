import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
//Vistas de autentificacion
import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciosesionComponent } from './pages/iniciosesion/iniciosesion.component';


@NgModule({
  declarations: [
    RegistroComponent,
    IniciosesionComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,

  ],
  exports: [
    RegistroComponent,
    IniciosesionComponent
  ],
})
export class AutentificacionModule { }
