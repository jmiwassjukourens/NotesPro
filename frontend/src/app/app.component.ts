import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/serviceAuth/auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotePro';
  isMenuActive = false;     
  isDesktop = window.innerWidth > 768; 
  expandedIndex: number | null = null;

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleMenu() {

    if (!this.isDesktop) {
      this.isMenuActive = !this.isMenuActive;
    }
  }

  toggleService(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    const wasDesktop = this.isDesktop;
    this.isDesktop = screenWidth > 768;


    if (!wasDesktop && this.isDesktop && this.isMenuActive) {
      this.isMenuActive = false;
    }
  }
}