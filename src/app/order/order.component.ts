import {Component, OnInit} from '@angular/core';
import {PrizeService} from '../product-picker/prize-service';
import {PrizeOrder} from '../model/prize-order.model';
import {UserService} from '../user.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    public loading: boolean;
    public gb: any;
    public orders: PrizeOrder;

    constructor(public prizeService: PrizeService, public userService: UserService) {
        prizeService.getOrders().subscribe(value => {
            this.orders = value;
        });
    }

    ngOnInit() {
        this.userService.getCurrentUserPoints();
    }

    private setUserPoints() {
        this.userService.getCurrentUserPoints().subscribe((value: number) => {
            this.userService.userPkt = value;
        }, error => {
        }, () => {
        });
    }
}
