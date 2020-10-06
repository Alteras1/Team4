import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { IUser } from '@app/Interfaces/IUser';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(username, password) {
    console.log(username);
    console.log(password);
    return this.http.post<IUser>(`${environment.authUrl}/login`, { username: username, password: password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: IUser) {
    return this.http.post(`${environment.authUrl}/register`, user);
  }

  update(params) {
    return this.http.post(`${environment.authUrl}/update`, params);
  }
}
