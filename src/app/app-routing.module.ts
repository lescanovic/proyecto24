import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './secciones/inicio/inicio.component';
import { GaleriaComponent } from './secciones/galeria/galeria.component';
import { RootNavComponent } from './root-nav/root-nav.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'galeria', component: GaleriaComponent },
  {path:'menu', component:RootNavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
