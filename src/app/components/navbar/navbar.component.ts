import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showRegister: boolean;
  isLoggedIn: boolean;
  loggedInUser: string;
  constructor(private authService: AuthService,
    private router: Router,
    private falshmessage: FlashMessagesService,
    private SettingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.SettingsService.getSettings().allowRegistration;
  }
  onLogout() {
    this.authService.logout();
    this.falshmessage.show("You are Now Logged Out", { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }
}
