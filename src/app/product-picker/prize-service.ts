import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';

import {Prize} from '../model/prize';
import {PrizeOrder} from '../model/prize-order.model';
import {AppConstans} from '../constans';

@Injectable()
export class PrizeService {


    readonly baseUrl = AppConstans.SERVERURL;

    public constructor(private http: HttpClient) {

    }

    getPrize(){
        return this.http.get<Prize[]>(this.baseUrl+`/prize/prizelist`);
    }

    saveOrder(order :PrizeOrder){
        return this.http.post(this.baseUrl+`/prize/order`,order);
    }


}