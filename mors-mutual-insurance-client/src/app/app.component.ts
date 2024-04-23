import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mors-mutual-insurance-client';

  constructor(private router: Router) {}

  isHomeRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
