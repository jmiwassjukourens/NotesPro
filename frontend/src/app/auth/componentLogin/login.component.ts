import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../serviceAuth/auth.service'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        console.log(response.message);
        // redirect  /users after succesfull login
        this.router.navigate(['/notes']);
      },
      (error) => {
        console.error('Error during login:', error);
       
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    );
  }
}
