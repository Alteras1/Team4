import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@app/Interfaces/IUser';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  auser: IUser;
  // tslint:disable-next-line: align
  // tslint:disable-next-line: no-unused-expression
  constructor( private accountService: AccountService, private alertService: AlertService, private router: Router) {
    this.auser = accountService.userValue;
  };

  // tslint:disable-next-line: typedef
  UpdateProfile(user: IUser) {
    console.log("updating now")
    this.alertService.clear()
    this.accountService.update(user).subscribe(
      data => {
        if (typeof user.newPassword != 'undefined' && user.newPassword) {
          this.accountService.logout()
          this.alertService.success("Successfully Changed");
        } else {
          console.log('updated');
          this.router.navigate(['']);
          this.alertService.success("Successfully Changed");
        }
      },
      error => {
        this.alertService.error(error);
      }
    );
  }
  ngOnInit(): void {

  }
}
