import { Component } from '@angular/core';
import { IUser } from './Interfaces/IUser';
import { AccountService } from './_services';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'Team4';
  user: IUser;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.accountService.logout();
}
}
