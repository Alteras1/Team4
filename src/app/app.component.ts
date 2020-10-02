import { Component } from '@angular/core';
import { User } from './_models';
import { AccountService } from './_services';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'Team4';
  user: User;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.accountService.logout();
}
}
