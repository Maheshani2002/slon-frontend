import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  constructor(public http: HttpClient) {
  }

  createAppointment(uid: string, date: string, time: string, message: string, email: string) {
    return this.http.post<any>(`${config.baseUrl}/appointment-controller`, {
      uid,
      date,
      time,
      message,
      email,
    }, {
      headers: {
        "Authorization": `Bearer ${config.accessToken}`,
        "content-type": "Application/Json"
      }
    })
  }

  getAppointments() {
    return this.http.get<any>(`${config.baseUrl}/appointment-controller`, {
      headers: {
        "Authorization": `Bearer ${config.accessToken}`,
        "content-type": "Application/Json"
      }
    })
  }
}
