import { Component, OnInit } from "@angular/core";
import { AuthService } from "../authentication/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(["auth/login"]);
    } catch (err) {
      this.toastr.error("There was a problem sigining you out");
    }
  }
}
