import {Component, OnInit} from '@angular/core';
import {BasketService} from './basket.service';
import {UserService} from '../user.service';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
    public clickNavNumber: number = 0;
    public isBasketVisable: boolean = false;

    constructor(public basketService: BasketService, public userService: UserService) {
    }

    ngOnInit() {
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
}
