import { Injectable } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { CognitoUser } from "amazon-cognito-identity-js";
import { AuthState } from "aws-amplify-angular/dist/src/providers";

export interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: NewUser;
  authState: AuthState;

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$.subscribe({
      next: authState => {
        console.log(authState);
        this.authState = authState;
      }
    });
  }

  async currentAuthenticatedUser(): Promise<CognitoUser | any> {
    return this.amplifyService.auth().currentAuthenticatedUser();
  }

  resendVerificationCode(email: string): Promise<CognitoUser | any> {
    return this.amplifyService.auth().resendSignUp(email);
  }

  signUp(user: NewUser): Promise<CognitoUser | any> {
    return this.amplifyService.auth().signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.firstName,
        family_name: user.lastName
      }
    });
  }

  confirmVerificationCode(email: string, code: string): Promise<any> {
    return this.amplifyService.auth().confirmSignUp(email, code);
  }

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: CognitoUser | any = await this.amplifyService
          .auth()
          .signIn(username, password);
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  signOut(): Promise<any> {
    return this.amplifyService.auth().signOut();
  }
}
