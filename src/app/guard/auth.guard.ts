import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from '../auth.service';
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private authenticationService :AuthenticationService) { }

    canActivate() {
        if (this.authenticationService.isLoggedIn()) {
            //localStorage.removeItem('findInputtext');
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;
        }

    }
}