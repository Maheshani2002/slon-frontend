import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }


  public login(email: string, password: string) {
    const headers = { 'content-type': 'application/json' }
    const body = {
      email, password
    }
    return this.http.post<any>(`${config.baseUrl}/auth-controller/login`, body, { "headers": headers })
  }
  public register(email: string, password: string) {
    const headers = { 'content-type': 'application/json' }
    const body = {
      email, password
    }
    return this.http.post<any>(`${config.baseUrl}/auth-controller/register`, body, { "headers": headers })
  }

  public signout() {
    try {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
    } catch (err) {
      console.log(`signout failed ${err}`)
    }
  }
}
