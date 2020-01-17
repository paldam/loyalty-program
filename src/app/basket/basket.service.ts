import {Injectable} from '@angular/core';
import {Prize} from '../model/prize';
import {PrizeOrderItems} from '../model/prize-order-items';
import {UserService} from '../user.service';
import {MessageServiceExt} from '../messages/messageServiceExt';

@Injectable({
    providedIn: 'root',
})
export class BasketService {
    constructor(public userService: UserService, private messageService : MessageServiceExt) {
    }

    public basketLines: PrizeOrderItems[] = [];
    public basketTotalPkt: number = 0;

    addPrizeToBasket(prize: Prize) {
        if (this.basketTotalPkt + prize.pkt > this.userService.userPkt) {
            this.messageService.addMessageWithTime('success', 'Błąd', 'Brak wystarczającej liczby punktów', 5000);
        } else {
            let line = this.basketLines.find(value => {
                return value.prize.id == prize.id;
            });
            if (line == undefined) {
                this.basketLines.push(new PrizeOrderItems(prize, 1));
            } else {
                line.quantity = line.quantity + 1;
            }
            this.recalculate();
        }
    }

    deleteLine(basket: PrizeOrderItems) {
        let index = this.basketLines.findIndex(data => data.prize.id == basket.prize.id);
        if (index > -1) {
            this.basketLines.splice(index, 1);
        }
        this.recalculate();
    }

    updateQuantity(basketLine: PrizeOrderItems, quantity: any) {
        console.log(quantity);
        if (quantity == 0) {
            this.deleteLine(basketLine);
        }
        let line = this.basketLines.find(line => line.prize.id == basketLine.prize.id);
        let currentLineQuantity;
        if (line != undefined) {
            currentLineQuantity = line.quantity;
            line.quantity = Number(quantity);
        }
        this.recalculate();
        if (this.basketTotalPkt > this.userService.userPkt) {
            line.quantity = currentLineQuantity;
            this.recalculate();
        }
    }

    recalculate() {
        this.basketTotalPkt = 0;
        this.basketLines.forEach(basket => {
            this.basketTotalPkt += (basket.prize.pkt * basket.quantity);
        });
    }
}