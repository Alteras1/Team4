import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@app/Interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  productURL = '/api/user/';

  constructor(private httpclient: HttpClient) { }
  
  getUserById(id): Observable<IUser> {
    let str : string = this.productURL  + id;
    return this.httpclient.get<IUser>(str);
  }
  UpdateUserById(user: IUser): Observable<IUser> {
    let str: string = this.productURL + user.id;
    console.log(user);
    return this.httpclient.put<IUser>(str, user);
   }
}
