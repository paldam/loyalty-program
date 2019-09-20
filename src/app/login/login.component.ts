import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from '../auth.service';
import {UserService} from '../user.service';
import {PasswordChange} from '../model/password_change.model';
import {NgForm} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {MessageServiceExt} from '../messages/messageServiceExt';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  public showChangePassworModal: boolean = false;
    public showResetPasswordModal: boolean = false;
    public passwordChange: PasswordChange = new PasswordChange();
    public formSubmitted: boolean = false;
    public formResetSubmitted: boolean = false;
    public passwordConfirm: string = '';
    public passwordDontMatch: any = null;
    public emailToReset: string;
    public resetText: boolean = false;

  constructor(
      private router: Router, private authenticationService: AuthenticationService, private userService :UserService, private messageService: MessageServiceExt) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

    login() {
        this.resetText = false;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.userService.isFirsLoginOfCurrentUser().subscribe(value => {

                        console.log(value);
                        if (value) {
                            this.loading = false;
                            this.showChangePassworModal = true;
                        } else {

                            this.router.navigate(['/']);
                        }
                    });


                } else {
                    this.error = 'Błąd wewnętrzny';
                    this.loading = false;
                }
            }, (err: Response) => {
                this.error = 'Login lub hasło jest nie poprawne';
                this.loading = false;
            });
    }

    submitResetPassForm(form) {
        this.formResetSubmitted = true;

        if (form.valid) {

            console.log(this.emailToReset);
            this.userService.resetPassword(this.emailToReset).subscribe(data => {
                    form.reset();
                    this.formResetSubmitted  = false;
                    this.showResetPasswordModal = false;
                    this.resetText = true;

                    setTimeout(() => {
                        this.resetText = false;
                    }, 10000);
                },
                err => {
                    this.messageService.addMessageWithTime('error', 'Status', err.error, 5000);
                });
        }
    }


    submitChangePassForm(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            if (this.passwordChange.newPassword != this.passwordConfirm) {
                this.passwordDontMatch = "Hasła są różne";
            } else {
                this.passwordDontMatch = null;
                this.userService.changePassword(this.passwordChange).subscribe(data => {
                    
                    console.log(data);
                        form.reset();
                        this.formSubmitted = false;
                        this.messageService.addMessageWithTime('success', 'Status', 'Zmieniono hasło', 5000);
                        this.router.navigate(['/']);

                    },
                    err => {
                        this.messageService.addMessageWithTime('error', 'Status', err.error, 5000);
                        console.log(err);

                    });
            }
        }
    }


}