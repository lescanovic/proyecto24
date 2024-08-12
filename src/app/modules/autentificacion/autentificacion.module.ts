import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Archivo de rutas Hijas
import { AutentificacionRoutingModule } from './autentificacion-routing.module';
//Vistas de autentificacion
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciosesionComponent } from './pages/iniciosesion/iniciosesion.component';

//componentes de material 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
//Componente de Angular
import {FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   RegistroComponent,
   IniciosesionComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    //Material
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    //Angular
    FormsModule

  ],
  exports: [
    RegistroComponent,
    IniciosesionComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
})
export class AutentificacionModule { }
