import {Injectable} from '@angular/core';
import {Prize} from './model/prize';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TOKEN} from './auth.service';
import {PasswordChange} from './model/password_change.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    public userPkt = 0;


    public protocol: string = "http";
    public port: number = 8080;
    public baseUrl: string;
    public id_token: string;

    constructor(private http: HttpClient,private router: Router) {

        this.baseUrl = `${this.protocol}://${location.hostname}:${this.port}`;

    }


    getCurrentUserPoints(){
        return this.http.get(this.baseUrl+`/current_user_points`);
    }

    isFirsLoginOfCurrentUser(){
        return this.http.get(this.baseUrl+`/is_first_time`);
    }

    changePassword(passwordChange: PasswordChange): any {
        return this.http.put(this.baseUrl+`/users/reset/`,passwordChange,{responseType:"text"})

    }


    resetPassword(email: string) {
        return this.http.get(this.baseUrl+`/program_users/resetpassword/${email}`)
    }
}