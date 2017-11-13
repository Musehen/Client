import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthHelperService } from '../../../services/auth-helper.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  subscriptions: Subscription[] = [];

  constructor(private authHelperService: AuthHelperService,
              private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    if (!user.username || !user.password) {
      return this.toastService.toast('Please fill in both fields.');
    }

    this.authService.loginUser(user).then((response) => {
      if (response.success) {
        this.authHelperService.storeUserData(response.token);
        this.toastService.successToast('Logged in.');
        this.router.navigate(['/']);
      } else {
        this.toastService.errorToast(response.msg);
      }
    }, (err) => {
      console.log(err);
      this.toastService.errorToast(err.parsedBody.msg);
    });
  }
}
