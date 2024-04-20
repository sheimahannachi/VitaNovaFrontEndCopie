import { Component } from '@angular/core';
import { UserModule } from 'src/app/Models/user.module';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }
  userProfile: UserModule;
  signOut(): void {
    this.authService.logoutAndRedirect();
    this.userProfile = new UserModule(); 
    console.log("aaaaaaaaa" +this.userProfile.picture)
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
