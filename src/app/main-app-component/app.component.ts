import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {RoutingState} from "../routing-stage";
import {SpinerService} from "../spiner.service";
import {Event} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit{
	title = 'app';



	constructor(private _formBuilder: FormBuilder, routingState: RoutingState, public spinerService: SpinerService, public router: Router) {


		routingState.loadRouting();
		this.router.events.subscribe((event: Event) => {
			switch (true) {
				case event instanceof NavigationStart: {
					this.spinerService.showSpinner = true;
					break;
				}
				case event instanceof NavigationEnd:
				case event instanceof NavigationCancel:{
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


}





