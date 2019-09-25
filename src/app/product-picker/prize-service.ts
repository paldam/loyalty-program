import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';

import {Prize} from '../model/prize';
import {PrizeOrder} from '../model/prize-order.model';

@Injectable()
export class PrizeService {

    public protocol: string = "http";
    public port: number = 8080;
    public baseUrl: string;

    public constructor(private http: HttpClient) {
        this.baseUrl = `${this.protocol}://www.kosze.waw.pl:${this.port}`;
    }

    getPrize(){
        return this.http.get<Prize[]>(this.baseUrl+`/prize/prizelist`);
    }

    saveOrder(order :PrizeOrder){
        return this.http.post(this.baseUrl+`/prize/order`,order);
    }


}