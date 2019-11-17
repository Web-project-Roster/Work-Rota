import { LoadingScreenComponent } from './Components/spinner/spinner.component';
import { Component } from "@angular/core";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'rota-spinner';

  constructor(private spinner: LoadingScreenComponent){}
  

}
