import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public navController: NavController) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.auth.isAuthenticated()) {
            this.navController.navigateRoot('/login');
            return false;
        }

        return true;
    }
}
