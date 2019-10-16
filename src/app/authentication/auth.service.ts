import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Subject, Observable } from 'rxjs';


export interface NewUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  constructor() {
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
   }

   signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email
      }
    });
  }
}
