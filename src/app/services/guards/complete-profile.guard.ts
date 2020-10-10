import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StationModel } from 'src/app/models/station.model';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Verify that the station exists and does not have a complete configuration  ========

      const merchant = JSON.parse(localStorage.getItem('merchant'));
      const information_is_complete = localStorage.getItem('information_is_complete');
      if (merchant) {
        if (information_is_complete == 'false') {
            this.router.navigate(['/complete-profile/']);
            return false;
        }
        return true;
      }

      return false;
  }

}
