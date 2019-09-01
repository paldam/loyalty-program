import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';

import {Prize} from '../model/prize';

@Injectable()
export class PrizeService {

    public protocol: string = "http";
    public port: number = 8080;
    public baseUrl: string;

    public constructor(private http: HttpClient) {
        this.baseUrl = `${this.protocol}://${location.hostname}:${this.port}`;
    }

    getPrize(){
        return this.http.get<Prize[]>(this.baseUrl+`/prizelist`);
    }


}