import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrors: string[] = [];
  user = new User();

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) {}

  ngOnInit() {}

  onSubmit(user: User) {
    this.auth.login(user).subscribe({
      next: loggedUser => {
        console.log('logged user', loggedUser);
        this.router.navigateByUrl('pets');
      },
      error: error => this.handleErrors(error.error),
    });
  }

  private handleErrors(errors: string[] | string) {
    this.loginErrors = Array.isArray(errors) ? errors : [errors];
  }

}
