import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  loading = false;
  error = '';

  constructor(private router : Router,public authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {

    this.authenticationService.login(this.email, this.password)
    .subscribe(result => {
        if (result === true) {
            this.router.navigate(['user']);
        } else {
            this.error = 'Email or password is incorrect';
            this.loading = false;
        }
    });
  }
}
