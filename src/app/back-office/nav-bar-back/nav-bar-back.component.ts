import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-nav-bar-back',
  templateUrl: './nav-bar-back.component.html',
  styleUrls: ['./nav-bar-back.component.css']
})
export class NavBarBackComponent {

  constructor(private authService: AuthService) { }

  signOut(): void {
    this.authService.logoutAndRedirect();
  }
}
