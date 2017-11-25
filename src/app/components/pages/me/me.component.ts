import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { VenuesService } from '../../../services/venues.service';
import { AuthHelperService } from '../../../services/auth-helper.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  myVenues = [];
  moderatingVenues = [];
  reviews = [];
  fullName;
  username;
  profilePicUrl;
  userId;

  constructor(private venuesService: VenuesService,
              private toastService: ToastService,
              private authHelperService: AuthHelperService) {
    this.onDataError = this.onDataError.bind(this);
    this.onMyVenuesSuccess = this.onMyVenuesSuccess.bind(this);
    this.onModeratingVenuesSuccess = this.onModeratingVenuesSuccess.bind(this);
    // Todo: reviews section
  }

  ngOnInit() {
    this.getMyVenues()
      .then(this.onMyVenuesSuccess)
      .catch(this.onDataError);
    this.getModeratingVenues()
      .then(this.onModeratingVenuesSuccess)
      .catch(this.onDataError);

    const decodedToken = this.authHelperService.getDecodedAuthToken();
    if (decodedToken) {
      this.fullName = `${decodedToken.firstName} ${decodedToken.lastName}`;
      this.profilePicUrl = decodedToken.profilePic;
    }
    this.username = this.authHelperService.getUsernameFromToken();
    this.userId = this.authHelperService.getUserIdFromToken();

  }

  onMyVenuesSuccess(response) {
    const { data } = response;
    this.myVenues = data.venues;
    this.venuesService.getImageUrls(this.myVenues);
  }
  onModeratingVenuesSuccess(response) {
    const { data } = response;
    this.moderatingVenues = data.venues;
    this.venuesService.getImageUrls(this.moderatingVenues);
  }

  onDataError(error) {
    console.log(error);
    this.toastService.errorToast('An error occured.');
  }

  getMyVenues(): Promise<Array<any>> {
    return this.venuesService.getMyVenuesPage(1);
  }
  getModeratingVenues(): Promise<Array<any>> {
    return this.venuesService.getModeratingVenuesPage(1);
  }

}
