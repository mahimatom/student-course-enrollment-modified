import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isAuthenticated = false;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    }
  }

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isAuthenticated', this.isAuthenticated.toString());
    }
  }
}
