import { Component } from '@angular/core';
import { UserModule } from 'src/app/Models/user.module';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userProfile: UserModule;
  
  constructor(private authService: AuthService) {
    this.userProfile = new UserModule(); // Initialize userProfile here


   }

  ngOnInit(): void {
    this.getUserInfoFromToken();
  }



  getUserInfoFromToken(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
        this.userProfile = response;
      },
      error => {
        console.error('Error fetching user information:', error);
      }
    );
  }

}
