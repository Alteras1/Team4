import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/_models';
import { AccountService } from '@app/_services';
@Component(
  { templateUrl: 'home.component.html' }
)
export class HomeComponent {
  user: IUser;
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
