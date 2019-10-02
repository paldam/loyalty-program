import {Injectable} from '@angular/core';
import {Prize} from './model/prize';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TOKEN} from './auth.service';
import {PasswordChange} from './model/password_change.model';
import {Observable} from 'rxjs';
import {AppConstans} from './constans';
export const TOKEN_USER: string = 'jwt_token_user';
@Injectable({
    providedIn: 'root',
})
export class UserService {

    public userPkt = 0;

    readonly baseUrl = AppConstans.SERVERURL;

    public id_token: string;

    constructor(private http: HttpClient,private router: Router) {

        this.baseUrl = AppConstans.SERVERURL;
        this.id_token = localStorage.getItem(TOKEN_USER);

    }


    public getCurrentUserPoints(){
        return this.http.get(this.baseUrl+`/current_user_points`);
    }

    public getCurrentUserName(): Observable<string>{
        return this.http.get(this.baseUrl+`/current_user_name`,{responseType:"text"});
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

    getUserName():string{
        return this.id_token;
    }


}