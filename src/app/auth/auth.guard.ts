import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from "../services/global.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private globalService: GlobalService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = state.url;
    return this.checkRole(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  private checkRole(route: ActivatedRouteSnapshot, url: string) {
    console.log(url)
    const token = this.globalService.storageServices.userStorageService.getToken();
    if (token != null && !this.globalService.storageServices.userStorageService.tokenExpired()) {
      const userRole = this.globalService.storageServices.userStorageService.getUser().roles;
      console.log(userRole, " ", userRole)
      return true;
    }

    this.router.navigate(['/admin-page/login']);
    return false;
  }
}
