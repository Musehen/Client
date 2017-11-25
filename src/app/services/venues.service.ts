import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class VenuesService {

  constructor(private apiService: ApiService) {
  }

  getMyVenuesPage(page?: number | string, search: string='') {
    return this.apiService.get(`/venues/mine?page=${page}&search=${search}`);
  }
  getModeratingVenuesPage(page?: number | string, search: string='') {
    return this.apiService.get(`/venues/moderating?page=${page}&search=${search}`);
  }
  getImageUrls(venues) {
    venues.forEach(venue => {
      venue.imageUrl = `${this.apiService.staticFilesUrl}${venue.image}`;
      console.log(venue.imageUrl);
    });
  }
}
