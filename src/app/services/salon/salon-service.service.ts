import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class SalonServiceService {

  constructor(private http: HttpClient) { }

  public getServices() {
    const headers = {
      'content-type': 'application/json',
      "Authorization": `Bearer ${config.accessToken}`
    }
   return this.http.get<any>(`${config.baseUrl}/`, { "headers": headers},);
  }
}
