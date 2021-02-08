import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44313/api/auth/';

  private currentUserSource = new ReplaySubject<User>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user.token));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
        }
      ));
  }

}
