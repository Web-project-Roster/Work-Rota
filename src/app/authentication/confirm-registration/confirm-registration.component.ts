import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AuthState } from "aws-amplify-angular/dist/src/providers";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-confirm-registration",
  templateUrl: "./confirm-registration.component.html",
  styleUrls: ["./confirm-registration.component.scss"]
})
export class ConfirmRegistrationComponent implements OnInit {
  email: string;
  authState: AuthState;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.authState = this.authService.authState;
    this.isUserAllowedHere(this.authState);

    this.form = this.fb.group({
      confirmationCode: [""]
    });
  }

  get confirmationCode() {
    return this.form.get("confirmationCode");
  }

  isUserAllowedHere({ state, user }) {
    if (state !== "confirmSignUp") {
      this.router.navigate(["auth/register"]);
    } else {
      this.email = user.username.username;
    }
  }

  async confirmCode() {
    try {
      await this.authService.confirmVerificationCode(
        this.email,
        this.confirmationCode.value
      );
      await this.authService.signIn(this.email, environment.userInfo.password);
      this.router.navigate([""]);
    } catch (err) {
      this.toastr.error(err);
      console.log(err);
    }
  }

  async resendVerificationCode() {
    try {
      await this.authService.resendVerificationCode(this.email);
      this.toastr.success("New verification code sent");
    } catch (err) {
      this.toastr.error(err);
    }
  }
}
