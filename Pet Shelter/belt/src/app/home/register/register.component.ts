import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationErrors: string[] = [];
  user = new User();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit() {}

  onSubmit(user: User) {
    this.auth.register(user).subscribe({
      next: loggedUser => {
        console.log('logged user', loggedUser);

        this.router.navigateByUrl('pets');
      },
      error: error => {
        console.log(error.error);
        this.handleErrors(error.error);
      },
    });
  }

  private handleErrors(errors: string[] | string) {
    this.registrationErrors = Array.isArray(errors) ? errors : [errors];
  }

}
