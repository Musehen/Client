import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AuthHelperService } from './auth-helper.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {
  constructor(private http: Http,
              private authHelperService: AuthHelperService) {
  }

  apiUrl = environment.apiUrl;
  staticFilesUrl = environment.staticFilesUrl;

  get(path: string) {
    let headers = new Headers();
    if (this.authHelperService.isLoggedIn()) {
      headers.append('Authorization', this.authHelperService.getAuthToken());
    }
    return this.http.get(`${this.apiUrl}${path}`, { headers: headers })
      .toPromise()
      .then((response) => this.extractData(response))
      .catch((response) => this.handleError(response));
  }

  post(path: string, data: any) {
    let headers = new Headers();
    if (this.authHelperService.isLoggedIn()) {
      headers.append('Authorization', this.authHelperService.getAuthToken());
    }
    return this.http.post(`${this.apiUrl}${path}`, data, { headers: headers })
      .toPromise()
      .then((response) => this.extractData(response))
      .catch((response) => this.handleError(response));
  }

  put(path: string, data: any) {
    let headers = new Headers();
    if (this.authHelperService.isLoggedIn()) {
      headers.append('Authorization', this.authHelperService.getAuthToken());
    }
    return this.http.put(`${this.apiUrl}${path}`, data, { headers: headers })
      .toPromise()
      .then((response) => this.extractData(response))
      .catch((response) => this.handleError(response));
  }


  delete(path: string) {
    let headers = new Headers();
    if (this.authHelperService.isLoggedIn()) {
      headers.append('Authorization', this.authHelperService.getAuthToken());
    }
    return this.http.delete(`${this.apiUrl}${path}`, { headers: headers })
      .toPromise()
      .then((response) => this.extractData(response))
      .catch((response) => this.handleError(response));
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || {};
      error['parsedBody'] = body;
      const err = body.err || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(error);
  }

  private  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
