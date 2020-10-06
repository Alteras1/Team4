import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/Interfaces/IUser';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  auser: IUser;
  // tslint:disable-next-line: align
  // tslint:disable-next-line: no-unused-expression
  constructor(private userservice: UserService){ };
  
  // tslint:disable-next-line: typedef
  UpdateProfile(user: IUser) {
    console.log("updating now" )
    this.userservice.UpdateUserById(user);
 }
  ngOnInit(): void {
    this.userservice.getUserById(1).subscribe({
      next: (data) => {
        this.auser = data as unknown as IUser;
      }
    }
    );
   }
}
