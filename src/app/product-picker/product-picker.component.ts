import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Prize} from '../model/prize';
import {PrizeService} from './prize-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasketService} from '../basket/basket.service';
import {UserService} from '../user.service';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../my-error-state-matcher';

@Component({
    selector: 'app-product-picker',
    templateUrl: './product-picker.component.html',
    styleUrls: ['./product-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductPickerComponent implements OnInit {






    // nameFormControl = new FormControl('', [
    //     Validators.required,
    // ]);
    // addressFormControl= new FormControl('', [
    //     Validators.required,
    // ]);
    //
    //
    // firstFormGroup: FormGroup = new FormGroup({
    //     name: this.nameFormControl,
    //     address: this.addressFormControl
    // });
    //
    // cityFormControl = new FormControl('', [
    //     Validators.required,
    // ]);
    // phoneFormControl = new FormControl('', [
    //     Validators.required,
    // ]);
    //
    // emailFormControl = new FormControl('', [
    //     Validators.required,
    //     Validators.email
    // ]);
    //
    // zipFormControl = new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('[0-9]{2}-[0-9]{3}')
    //
    // ]);

    matcher = new MyErrorStateMatcher();

    public prizes: Prize[] = [];


    firstFormGroup: FormGroup;
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
        this.firstFormGroup = new FormGroup({
            'nameFormControl': new FormControl(null, Validators.required),
            'addressFormControl': new FormControl(null,Validators.required)
        });

    }

    
    
    test(form : NgForm){
        
        console.log(form);
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
