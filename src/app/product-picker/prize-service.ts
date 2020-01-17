import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prize} from '../model/prize';
import {PrizeOrder} from '../model/prize-order.model';
import {AppConstants} from '../constants';
import {Observable} from 'rxjs';

@Injectable()
export class PrizeService {
    readonly baseUrl = AppConstants.SERVERURL;

    public constructor(private http: HttpClient) {
    }

    getPrize() {
        return this.http.get<Prize[]>(this.baseUrl + `/prize/prizelistnodel`);
    }

    saveOrder(order: PrizeOrder) {
        return this.http.post(this.baseUrl + `/prize/order`, order);
    }

    getOrders(): Observable<PrizeOrder> {
        return this.http.get(this.baseUrl + `/prize/userorders`);
    }
}