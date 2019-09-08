import {Injectable} from '@angular/core';
import {Prize} from './model/prize';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TOKEN} from './auth.service';

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


}