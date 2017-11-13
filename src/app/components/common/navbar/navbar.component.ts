import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelperService } from '../../../services/auth-helper.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string;
  profilePicUrl: string;
  fullName: string;
  routerLinkOpts: object = { exact: true };
  userId: string;

  constructor(public authHelperService: AuthHelperService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
    const decodedToken = this.authHelperService.getDecodedAuthToken();
    if (decodedToken) {
      this.fullName = `${decodedToken.firstName} ${decodedToken.lastName}`;
      this.profilePicUrl = decodedToken.profilePic;
    }
    this.username = this.authHelperService.getUsernameFromToken();
    this.userId = this.authHelperService.getUserIdFromToken();

    this.authHelperService.loginAnnounced.subscribe(data => {
      const decToken = this.authHelperService.getDecodedAuthToken();
      this.username = this.authHelperService.getUsernameFromToken();
      this.userId = this.authHelperService.getUserIdFromToken();
      this.profilePicUrl = this.authHelperService.getProfilePictureFromToken();
    });
  }

  onLogoutClick() {
    this.authHelperService.logout();
    this.toastService.successToast('Logged out.');
    this.router.navigate(['/']);
    return false;
  }

}
