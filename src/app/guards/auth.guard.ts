import { RolService } from 'src/app/services/rol.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, of } from 'rxjs';
import { Rol } from '../models/rol.models';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rolService = inject(RolService);
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    router.navigate(['page/login']);
    return false;
  }

  // Decodifica el token
  const decodedToken: any = jwtDecode(token);
  const userRoleId = decodedToken.roles; // Asegúrate de que esto sea un ID, no un array

  return rolService.getAll().pipe(
    map((roles: Rol[]) => {
      const role = roles.find((rol) => rol._id === userRoleId);

      // Si no se encuentra el rol, redirigir al login
      if (!role) {
        router.navigate(['page/login']);
        return false; // No permitir acceso
      }

      const currentUrl = router.url; // Obtener la URL actual

      // Definir las rutas según el rol
      const routes: { [key: string]: string } = {
        '6710292d55b49be53e555962': 'page/home',
        '670ca07faf1e9510e0ea0cf2': 'page/vista-profesor',
        '670ca153af1e9510e0ea0cf4': 'page/vista-alumno',
      };

      const redirectTo = routes[role._id]; // Ruta a la que redirigir según el rol

      console.log(`Current URL: ${currentUrl}, Redirecting to: ${redirectTo}`);

      // Si la ruta a redirigir es diferente de la actual, redirigir
      if (redirectTo && currentUrl !== redirectTo) {
        router.navigate([redirectTo]);
        return false; // No permitir acceso a la ruta actual
      }

      return true; // Permitir acceso si no hay redirección
    }),
    // Manejar errores si la llamada al servicio falla
    catchError((error) => {
      console.error('Error al obtener roles', error);
      router.navigate(['page/login']); // Redirigir al login si hay un error
      return of(false); // No permitir acceso
    })
  );
};
