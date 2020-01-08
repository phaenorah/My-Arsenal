import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthed = false;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) {}

  ngOnInit() {
    this.auth.isAuthed$.subscribe(authed => {
      console.log('authed?', authed);
      this.isAuthed = authed;
    });
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
