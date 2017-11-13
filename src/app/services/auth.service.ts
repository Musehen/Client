import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService) {
  }

  registerUser(user): Promise<any> {
    return this.apiService.post(`/users/register`, user);
  }

  loginUser(user): Promise<any> {
    return this.apiService.post(`/users/login`, user);
  }
}
