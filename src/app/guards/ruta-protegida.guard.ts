import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';


//Operadores de tipo Observables
import{map,switchMap, of, from} from 'rxjs'
export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  //Inyectamos/ instanciamos servicio de auntentificacion en el guardian (forma local)
  const servicioAuth = inject (AuthService)

  //Inyectamos/ Instanciamos servicio de rutas de forma local
  const servicioRutas = inject (Router)

  //Espeficiamos cual es el rol que va a esperar el guardian para activarse
  const rolEsperado = 'admin' ; 

  return true;
};
