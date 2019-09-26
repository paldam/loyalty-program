import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../user.service';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainmanu',
  templateUrl: './mainmanu.component.html',
  styleUrls: ['./mainmanu.component.css']
})
export class MainmanuComponent implements OnInit {

  constructor(public userService :UserService,public  authenticationService :AuthenticationService,public router: Router) {

  }

  ngOnInit() {
  }

}
