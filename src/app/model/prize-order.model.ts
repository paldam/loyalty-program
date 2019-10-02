import {PrizeOrderItems} from './prize-order-items';
import {PrizeOrderStatus} from './priz-order-status.model';

export class PrizeOrder {
    constructor(
        public id?: number,
        public orderDate?: Date,
        public prizeOrderItems?: PrizeOrderItems[],
        public additionalInformation?: string,
        public orderTotalAmount? : number,
        public nameLastname? : string,
        public address? : string,
        public zipCode? : string,
        public city? : string,
        public phone? : string,
        public email? : string,
        public prizeOrderStatus? : PrizeOrderStatus

    ){
    }
}

