import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = "http://localhost:8080/user"
    private userRegisterUrl = "http://localhost:8080/user/register";

    constructor(private http: HttpClient) { }

    registerUser(data: any): Observable<User> {
        return this.http.post<User>(this.userRegisterUrl, data);
    }
}
