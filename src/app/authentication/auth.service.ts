import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Subject, Observable } from 'rxjs';


export interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
      console.log(data);
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
        email: user.email,
        given_name: user.firstName,
        family_name: user.lastName
      }
    });
  }

  signIn(username: string, password: string): Promise<CognitoUser|any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: CognitoUser|any = await Auth.signIn(username, password);
        this.loggedIn = true;
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false);
  }
}
