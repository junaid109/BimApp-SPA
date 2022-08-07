import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';

const httpOptions = {

  headers: new HttpHeaders({
    Authorization: "Bearer" + JSON.parse(localStorage.getItem('user'))?.token
  }),
}
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    localStorage.setItem('user', "1212");

   }

   getMembers(): Observable<Member[]> {
     return this.http.get<Member[]>(this.baseUrl + "api/users", httpOptions);
   }

   getMember(username: string) {

    return this.http.get<Member>(this.baseUrl + "api/users" + username, httpOptions);

   }
}
