import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const AuthenticationGuard = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);
  if (authService.Token) {
    return true;
  } else {
    router.navigate(['/LogIn']);
    return false;
  }
};

export const IsLoggedInGuard = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);
  if (authService.Token) {
    router.navigate(['/Timetable']);
  }
  return true;
};
