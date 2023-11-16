import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Lógica de verificación de acceso aquí
    const userType = sessionStorage.getItem('tipo') // Método para obtener el tipo de usuario
    if (userType === '0') {

      const permisos = ['admin','home','map','admin-viv','profile']; // Método para obtener los permisos del usuario
      const ruta = route.routeConfig?.path; // Obtener la ruta a la que intenta acceder el usuario
      if (ruta && permisos.includes(ruta)) {
        console.log("El admin puede acceder")

        return true; // El usuario tiene acceso a la ruta
      }
    } else if (userType === '1') {

      const permisos = ['map','home','comparar','favoritos','profile','vivienda/:id']
      const ruta = route.routeConfig?.path; // Obtener la ruta a la que intenta acceder el usuario
      if (ruta && permisos.includes(ruta)) {
        console.log("El Usuario puede acceder")

        return true; // El usuario tiene acceso a la ruta
      }
    } else if (userType === '2'){
      const permisos = ['map','gestionar-viviendas','profile','home']
      const ruta = route.routeConfig?.path; // Obtener la ruta a la que intenta acceder el usuario
      if (ruta && permisos.includes(ruta)) {
        console.log("El Usuario puede acceder")

        return true; // El usuario tiene acceso a la ruta
      }
    }
    // Si el usuario no tiene acceso, redirigir a una página de acceso denegado
    this.router.navigate(['/home']);
    return false;
  };

}
