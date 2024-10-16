import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usuariosSimulados } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   //para mostrar el estado del login
   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Para mostrar el estado del login
   isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Para mostrar el estado del login

   private usuarioSubject = new BehaviorSubject<string>(''); // Para mostrar el nombre del usuario actualmente logueado  // Para mostrar el nombre del usuario
   usuario$ = this.usuarioSubject.asObservable(); // Para mostrar el nombre del usuario actualmente logueado

   private rolSubject = new BehaviorSubject<string>(''); // Para mostrar el rol del usuario actualmente logueado
   rol$ = this.rolSubject.asObservable(); // Para mostrar el rol del usuario actualmente logueado

   // Agregar un BehaviorSubject para el estado de loginFailed
   private loginFailedSubject = new BehaviorSubject<boolean>(false); // Para mostrar si falló la autenticación
   loginFailed$ = this.loginFailedSubject.asObservable(); // Para mostrar si falló la autenticación

  /* buscarDB(usuario: string, clave: string){ "metodo de prueba"
    if (usuario === 'admin' && clave === 'admin') {
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(usuario);
      this.loginFailedSubject.next(false);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
   }*/

  login(usuario: string, clave: string): void {
    const usuarioEncontrado = usuariosSimulados.find(
       user => user.usuario === usuario && user.clave === clave
    );
    if (usuarioEncontrado) {
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(usuarioEncontrado.nombreCompleto);
      this.rolSubject.next(usuarioEncontrado.rol);
      this.loginFailedSubject.next(false);
    }
    else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
   }
   logout(): void {
    this.usuarioSubject.next('');  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  // Resetear el nombre de usuario al desloguearse.  //
    this.rolSubject.next('');
    this.isAuthenticatedSubject.next(false); // Desloguearse y desactivar el estado de autenticación.  // Desloguearse y
    this.loginFailedSubject.next(false);  // Restablecer loginFailed al cerrar sesión
  }

  }
