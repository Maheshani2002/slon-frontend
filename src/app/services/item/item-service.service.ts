import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(public http:HttpClient) { }

public  getItems(){
    return this.http.get<any>(`${config.baseUrl}/item-controller`,{headers : {"content-type" : "Application/Json","Authorization" : "Bearer " + config.accessToken}});
}
}
