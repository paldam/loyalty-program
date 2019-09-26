import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Prize} from '../model/prize';
import {PrizeService} from './prize-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasketService} from '../basket/basket.service';
import {UserService} from '../user.service';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../my-error-state-matcher';
import {PrizeOrder} from '../model/prize-order.model';
import {AuthenticationService} from '../auth.service';
import {SpinerService} from '../spiner.service';
import {MatStepper} from '@angular/material';
import {PrizeOrderItems} from '../model/prize-order-items';


declare var jquery: any;
declare var $: any;
@Component({

    selector: 'app-product-picker',
    templateUrl: './product-picker.component.html',
    styleUrls: ['./product-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductPickerComponent implements OnInit {
    matcher = new MyErrorStateMatcher();
    public prizes: Prize[] = [];
    public order: PrizeOrder = new PrizeOrder();
    public firstFormGroup: FormGroup;
    public filtersLoaded: Promise<boolean>;
    public rangeValues: number[] = [0, 0];
    public rangeConst: number[] = [0, 0];
    public prizesfiltered: any[] = [];
    public clickNavNumber: number = 0;
    public isBasketVisable: boolean = false;
    @ViewChild('stepper',{static: false}) stepper: MatStepper;

    constructor(private _formBuilder: FormBuilder,public spinerService :SpinerService, public prizeService: PrizeService, public basketService: BasketService, public userService: UserService, public authenticationService: AuthenticationService) {
        this.setUserPoints();
        this.setPrizeFilter();
    }

    ngOnInit() {
        this.firstFormGroup = new FormGroup({
            'nameFormControl': new FormControl(null, Validators.required),
            'addressFormControl': new FormControl(null, Validators.required),
            'zipFormControl': new FormControl(null, [Validators.pattern('[0-9]{2}-[0-9]{3}'),Validators.required]),
            'cityFormControl': new FormControl(null, Validators.required),
            'phoneFormControl': new FormControl(null, Validators.required),
            'emailFormControl': new FormControl(null, [Validators.required, Validators.email]),
        });
    }

    private getPrize() {
        this.spinerService.showSpinner = true;
        this.prizeService.getPrize().subscribe(data => {
            this.prizes = data;
        },error1 => {

        },() => {
            this.spinerService.showSpinner = false;
        });
    }

    private setUserPoints() {
        this.userService.getCurrentUserPoints().subscribe((value: number) => {
            this.userService.userPkt = value;
            console.log("ustawiam punkty");
        }, error => {
        }, () => {
            this.getPrize();
        });
    }

    private setPrizeFilter() {
        this.prizeService
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

    sortBasketDESC() {
        this.prizesfiltered.sort((a, b): number => {
            return b.pkt - a.pkt;
        });
    }

    saveOrder() {
        this.order.prizeOrderItems = this.basketService.basketLines;
        this.order.orderTotalAmount = this.basketService.basketTotalPkt;
        this.prizeService.saveOrder(this.order).subscribe(value => {
            console.log(value);
        }, error => {
            console.log(error);
        }, () => {
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

    animateBasket() {

        $('#icco').css('transform', 'translate(-30px, 0px)');

        setTimeout(() => {
            $('#icco').css('transform', 'scale(1.2)');
        }, 200);
         setTimeout(() => {
             $('#icco').css('transform', 'scale(1)');
         }, 400);
    }

    getBadgeStyle(): string {
        if (this.basketService.basketLines.length == 0) {
            return 'badge';
        } else if (this.basketService.basketLines.length <= 9) {
            return 'badge1';
        } else if (this.basketService.basketLines.length > 9)
            return 'badge2';
    }





    checkWeatherHideBasket(){
        if(this.basketService.basketLines.length == 0){
            this.slidNav();
            this.stepper.selectedIndex = 0;
        }

    }

    deleteLine(basket : PrizeOrderItems){

     this.basketService.deleteLine(basket);


    }

    updateQuantity(basketLine: PrizeOrderItems, quantity: any) {

        this.basketService.updateQuantity(basketLine,quantity);


        if(this.basketService.basketLines.length == 0){

            this.slidNav();
            this.stepper.selectedIndex = 0;
        }

    }


    slidNav() {
        if (this.clickNavNumber % 2 == 0) {
            // $('#menu_slide_icon').addClass('fa-rotate-180');
            $('#basket_cont').css('width', '400px');
            // $('#main').css('marginLeft', '0px');
            // $('#black').removeClass('black_background');
            this.clickNavNumber += 1;
        } else {
            // $('#menu_slide_icon').removeClass('fa-rotate-180');
            if ($(window).width() > 650) {
                $('#basket_cont').css('width', '0px');
                // $('#main').css('marginLeft', '190px');
            } else {
                $('#basket_cont').css('width', '0px');
                // $('#main').css('marginLeft', '0px');
                // $('#black').addClass('black_background');
            }
            this.clickNavNumber += 1;
        }
    }


    goForward(stepper: MatStepper){
        stepper.next();
        this.slidNav();
    }
}
