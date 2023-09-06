import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../models/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../models/authResponse.interface';
import { LoginRequestInterface } from '../models/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = this.baseURL + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = this.baseURL + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = this.baseURL + '/user';

    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }
}
