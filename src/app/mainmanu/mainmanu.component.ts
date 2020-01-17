import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PasswordChange} from '../model/password_change.model';
import {MessageServiceExt} from '../messages/messageServiceExt';

@Component({
    selector: 'app-mainmanu',
    templateUrl: './mainmanu.component.html',
    styleUrls: ['./mainmanu.component.css']
})
export class MainmanuComponent implements OnInit {
    public showChangePassworModal: boolean = false;
    public passwordChange: PasswordChange = new PasswordChange();
    public formSubmitted: boolean = false;
    public passwordConfirm: string = '';
    public passwordDontMatch: any = null;
    public currentUserName: string = '';

    constructor(public userService: UserService, public  authenticationService: AuthenticationService,
                public router: Router, public  messageService: MessageServiceExt) {
        this.setUserPoints();
        this.setUserName();
    }

    ngOnInit() {
    }

    private setUserName() {
        this.userService.getCurrentUserName().subscribe((value: string) => {
            this.currentUserName = value;
        }, error => {
        }, () => {
        });
    }

    private setUserPoints() {
        this.userService.getCurrentUserPoints().subscribe((value: number) => {
            this.userService.userPkt = value;
            console.log('ustawiam punkty');
        }, error => {
        }, () => {
        });
    }

    submitChangePassForm(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            if (this.passwordChange.newPassword != this.passwordConfirm) {
                this.passwordDontMatch = 'Hasła są różne';
            } else {
                this.passwordDontMatch = null;
                this.userService.changePassword(this.passwordChange).subscribe(data => {
                        form.reset();
                        this.formSubmitted = false;
                        this.messageService.addMessageWithTime('success', 'Status', 'Zmieniono hasło', 5000);
                        this.showChangePassworModal = false;
                    },
                    err => {
                        this.messageService.addMessageWithTime('error', 'Status', err.error, 5000);
                        this.showChangePassworModal = false;
                    });
            }
        }
    }
}
