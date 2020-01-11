import { User } from './../interfaces/User';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiName = 'prod-users-api';

  constructor() { }

  searchUserByEmail(email: string, rotaId: string): Promise<User> {
    rotaId = rotaId.split('#')[1];
    return API.get(this.apiName, `/users/search/${rotaId}?email=${email}`, '');
  }

  searchUserByEmailForNewRota(email: string): Promise<User> {
    return API.get(this.apiName, `/users/search?email=${email}`, '');
  }
}
