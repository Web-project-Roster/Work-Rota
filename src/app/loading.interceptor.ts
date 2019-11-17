import { SpinnerService } from './Services/spinner.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { Injectable } from '@angular/core';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  activeRequests: number = 0;

  constructor(private SpinnerService: SpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.SpinnerService.startLoading();
    }

    this.activeRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.SpinnerService.stopLoading();
        }
      })
    )
  };

}