import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  headers = {
    'content-type': 'application/json',
    "Authorization": `Bearer ${config.accessToken}`
  }
  constructor(private http: HttpClient) { }

  public getReviews() {
    return this.http.get<any>(`${config.baseUrl}/review-controller`, { headers: this.headers });
  }

  public addReview(review: string) {


    let email: string | null = sessionStorage.getItem("email");
    let image_url: string | null = sessionStorage.getItem("prfile_image");

    if (!image_url) {
      image_url = "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"
    }




    if (email && image_url) {
      let name = email.split("@")[0];
      const body = {
        name,
        email,
        image_url,
        review
      }
      return this.http.post<any>(`${config.baseUrl}/review-controller`, body, { headers: this.headers })
    }
    return null;
  }


}
