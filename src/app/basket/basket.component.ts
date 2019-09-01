import { Component, OnInit } from '@angular/core';
import {BasketService} from './basket.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public basketService :BasketService, public userService: UserService) { }

  ngOnInit() {
  }


    getBadgeStyle(): string {
        if (this.basketService.basketLines.length == 0) {
            return "badge"
        } else if (this.basketService.basketLines.length <= 9) {
            return "badge1";
        } else if (this.basketService.basketLines.length > 9)
            return "badge2";
    }

}
