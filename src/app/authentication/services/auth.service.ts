import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegisterRequestInterface } from '../models/registerRequest.interface'
import { map, Observable } from 'rxjs'
import { CurrentUserInterface } from '../../shared/models/currentUser.interface'
import { environment } from '../../../environments/environment'
import { AuthResponseInterface } from '../models/authResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.apiURL
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = this.baseURL + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.user))
  }
}
