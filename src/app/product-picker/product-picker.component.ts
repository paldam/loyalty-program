import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Prize} from '../model/prize';
import {PrizeService} from './prize-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasketService} from '../basket/basket.service';
import {UserService} from '../user.service';

@Component({
    selector: 'app-product-picker',
    templateUrl: './product-picker.component.html',
    styleUrls: ['./product-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductPickerComponent implements OnInit {
    public prizes: Prize[] = [];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    filtersLoaded: Promise<boolean>;
    public rangeValues: number[] = [0, 0];
    public rangeConst: number[] = [0, 0];
    public prizesfiltered: any[] = [];

    constructor(private _formBuilder: FormBuilder, prizeService: PrizeService, public basketService: BasketService, public userService :UserService) {
        prizeService.getPrize().subscribe(data => {
            this.prizes = data;
        });
        prizeService
            .getPrize()
            .toPromise()
            .then(res => {
                this.prizes = res;
                this.prizesfiltered = res;
                this.rangeConst[0] = this.rangeValues[0] = Math.min.apply(
                    Math,
                    this.prizesfiltered.map(function (o) {
                        return o.pkt;
                    })
                );
                this.rangeConst[1] = this.rangeValues[1] = Math.max.apply(
                    Math,
                    this.prizesfiltered.map(function (o) {
                        return o.pkt;
                    })
                );
                this.filtersLoaded = Promise.resolve(true);
            });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }


    sortBasketDESC() {
        this.prizesfiltered.sort((a, b): number => {
            return b.pkt - a.pkt;
        });
    }

    sortBasketASC() {
        this.prizesfiltered.sort((a, b): number => {
            return a.pkt - b.pkt;
        });
    }

    filterByPriceRange(a: number, b: number) {
        console.log('Zakres do sortowania od ' + a + ' do ' + b);

        this.prizesfiltered = this.prizes.filter((prize: Prize) => {
            return prize.pkt >= a && prize.pkt <= b;
        });
    }

}
