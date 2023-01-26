import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthServiceService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(email: string, password: string) {
    try {
      this.authService.login(
        email, password
      ).subscribe({
        next: data => {
          const token: string = data["token"];
          this.saveToStorage(email, token);
          alert("User authenticated succesfully");
          this._router.navigateByUrl('/')
        },
        error: error => {
          this.authService.register(email, password).subscribe({
            next: data => {
              console.log("register data " + data);
              this.authService.login(
                email, password
              ).subscribe({
                next: d => {
                  const token: string = d["token"];
                  this.saveToStorage(email, token);
                  this._router.navigateByUrl('/')
                  alert("User authenticated succesfully");
                  window.location.reload();
                },
                error: error => {
                  console.log("login failed at second time");
                }
              });
            },
            error: error => {
              console.log("register fauled ")
            }
          })
        }
      });
    } catch (err) {
      console.log(`login failed ${err}`);

    }
  }

  saveToStorage(email: string, token: string) {
    const name = email.split("@")[0]
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("token", token)
  }

}
