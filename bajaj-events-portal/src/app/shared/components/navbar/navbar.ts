import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationStart } from '@angular/router';
import { SecurityApi } from '../../../features/security/services/security-api';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private _router = inject(Router);
  private _securityApi = inject(SecurityApi);
  protected isLoggedIn: boolean = false;
  protected role: string | null;

  ngOnInit(): void {
    this._router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          if (this._securityApi.getToken()) {
            this.role = this._securityApi.getRole();
            this.isLoggedIn = true;
          }
        }
      },
    });
  }

  logout(): void {
    this._securityApi.logout();
    this.isLoggedIn = false;
  }
}
