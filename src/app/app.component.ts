import { AmplifyService } from 'aws-amplify-angular';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private AmplifyService: AmplifyService) { }
}
