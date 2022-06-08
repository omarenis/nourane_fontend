import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
export interface Token{
    access: string;
    refresh: string;
    userId: number;
    role: string;
    firstname: string;
    lastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  path = `${environment.url}`;

    constructor(private httpClient: HttpClient) {}

    public login(email: string, password: string): Observable<Token> {
        return this.httpClient.post<Token>(`${this.path}/api/login`, {email, password});
    }

    public signup(person: any): Observable<void> {
        return this.httpClient.post<void>(`${this.path}/api/signup`, person);
    }

    public logout(refresh: string, access: string): Observable<void> {
        return this.httpClient.post<void>(`${this.path}/logout`, {refresh}, {
            headers: {
                Authorization: `Bearer ${access}`
            }
        });
    }
}
