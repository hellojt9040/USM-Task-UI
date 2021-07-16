import { AuthService } from 'src/app/common/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private commonService:CommonService,
    private router:Router
    ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const userDetails = this.commonService.currentUser
    if(userDetails?.designation !== "staff" )
      return true

    return false
  }

}
