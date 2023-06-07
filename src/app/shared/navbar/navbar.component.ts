import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !user ? false : true;
   });

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout () {
    this.authService.logout();
  }

}
