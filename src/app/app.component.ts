import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quiz_app';


  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log("autologin is called")
    this.authService.autoLogin();
  }
}
