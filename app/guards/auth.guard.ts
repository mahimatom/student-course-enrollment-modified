import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Simulate authentication check
    if (typeof localStorage === 'undefined') {
      // Running on server, deny access
      return false;
    }
    
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      return true;
    }
    
    // Redirect to students page if not authenticated
    this.router.navigate(['/students']);
    return false;
  }
}
