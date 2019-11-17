import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from "../../services/spinner.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private SpinnerService: SpinnerService) {
  }
  ngOnInit() {
    this.loadingSubscription = this.SpinnerService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}