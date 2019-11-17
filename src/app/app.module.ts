import {
  AmplifyService,
  AmplifyModules,
  AmplifyAngularModule
} from "aws-amplify-angular";
import { AuthService } from "./authentication/auth.service";
import Auth from "@aws-amplify/auth";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { ConfirmRegistrationComponent } from "./authentication/confirm-registration/confirm-registration.component";
import { LoginComponent } from "./authentication/login/login.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { MainComponent } from "./main/main.component";
import { SpinnerComponent } from './Components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent,
    LoginComponent,
    AuthenticationComponent,
    MainComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AmplifyAngularModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center"
    })
  ],
  providers: [
    // AuthService,
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({
          Auth
        });
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
