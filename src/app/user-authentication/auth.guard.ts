import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  Router} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionDataService } from '../session-data/session-data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessiondata: SessionDataService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.sessiondata.checkUser();
      const token = this.sessiondata.checkToken();
      if (user && token){
        return true;
      } else {
        this.router.navigate([''])
        return false;
      }
  }
  
}
