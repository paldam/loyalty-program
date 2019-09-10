import {Observable} from "rxjs/Observable";
import {EventEmitter, Injectable, Output} from "@angular/core";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BasketService} from './basket/basket.service';
import {TokenInterceptor} from './token.interceptor';

export const TOKEN: string = 'jwt_token';
export const TOKEN_USER: string = 'jwt_token_user';
const jwtHelperService = new JwtHelperService();

@Injectable()
export class AuthenticationService {


    public protocol: string = "http";
    public port: number = 8080;
    public baseUrl: string;
    public id_token: string;

    constructor(private http: HttpClient,private router: Router, private basketService :BasketService) {

        this.baseUrl = `${this.protocol}://${location.hostname}:${this.port}`;

        // set token if saved in local storage
        this.id_token = localStorage.getItem(TOKEN);
    }

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    login(username: string, password: string): Observable<boolean> {
        const data = {
            username: username,
            password: password
        };
        return this.http.post(this.baseUrl + `/auth_loyalty_program`, data).pipe(


        map((response: any) =>{
            let token = response.id_token;

            if (token) {
                this.id_token=token;
                localStorage.setItem(TOKEN,token);
                localStorage.setItem(TOKEN_USER, username);
                this.getLoggedInName.emit(this.getCurrentUser());
                return true;
            }else{
                this.getLoggedInName.emit("wylogowano");
                return false;
            }

        })
        )

    }


    logout(): void {
        this.id_token = null;
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(TOKEN_USER);
        this.basketService.basketLines= [];
        this.basketService.basketTotalPkt = 0;
        this.getLoggedInName.emit("wylogowano");
        this.router.navigate(['login']);

    }

    isLoggedIn() : boolean{
        return !jwtHelperService.isTokenExpired(this.id_token);

    }



    getCurrentUser(){
        if (localStorage.getItem(TOKEN))  {
            return jwtHelperService.decodeToken(this.id_token).sub;
        }
    }


}