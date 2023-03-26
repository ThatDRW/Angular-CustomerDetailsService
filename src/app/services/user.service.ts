import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private userRegisterUrl = "http://localhost:8080/user/register";

    constructor(private http: HttpClient) { }

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(this.userRegisterUrl, user);
    }
}
