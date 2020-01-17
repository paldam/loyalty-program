import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {RoutingState} from '../routing-stage';
import {SpinerService} from '../spiner.service';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../user.service';
import {AuthenticationService} from '../auth.service';
import {AppConstants} from '../constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public serverUrl = AppConstants.SERVERURL_NO_PORT;

    constructor(private _formBuilder: FormBuilder, public authenticationService: AuthenticationService,
                public userService: UserService, public routingState: RoutingState, public spinerService: SpinerService,
                public router: Router) {
        routingState.loadRouting();
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.spinerService.showSpinner = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel: {
                    this.spinerService.showSpinner = false;
                    break;
                }
                case event instanceof NavigationError: {
                    this.spinerService.showSpinner = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    ngOnInit() {
    }

    setPointStyle() {
        let numDigits = this.count_digits(this.userService.userPkt);
        console.log(numDigits);
        let styles = {
            'position': 'absolute',
            'top': '28px',
            'z-index': '1001',
            'color': '#8c8b8b',
            'font-size': '35px',
            'font-weight': 'bold',
            'left': ''
        };
        let expr = '';
        switch (numDigits) {
            case 0:
                expr = 'calc(50% - 8px)';
                break;
            case 1:
                expr = 'calc(50% - 8px)';
                break;
            case 2:
                expr = 'calc(50% - 18px)';
                break;
            case 3:
                expr = 'calc(50% - 24px)';
                break;
            case 4:
                expr = 'calc(50% - 34px)';
                break;
            case 5:
                expr = 'calc(50% - 44px)';
                break;
            case 6:
                expr = 'calc(50% - 54px)';
                break;
            default:
                expr = 'calc(50% - 64px)';
        }
        styles.left = expr;
        return styles;
    }

    private count_digits(n) {
        let numDigits = 0;
        let integers = Math.abs(n);
        while (integers > 0) {
            integers = (integers - integers % 10) / 10;
            numDigits++;
        }
        return numDigits;
    }
}





