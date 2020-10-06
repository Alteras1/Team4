import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/Interfaces/IUser';
import { UserService } from '@app/services/user.service';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  auser: IUser;
  // tslint:disable-next-line: align
  // tslint:disable-next-line: no-unused-expression
  constructor( private accountService: AccountService) {
    this.auser = accountService.userValue;
  };

  // tslint:disable-next-line: typedef
  UpdateProfile(user: IUser) {
    console.log("updating now")
    this.accountService.update(user).subscribe();
  }
  ngOnInit(): void {

  }
}
