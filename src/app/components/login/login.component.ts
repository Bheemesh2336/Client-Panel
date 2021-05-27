import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  OnSubmit() {
    this.authService.login(this.email, this.password).then(res => {
      this.flashMsg.show('You Are Now Logged In', { cssClass: 'alert-sucess', timeout: 2000 });
      this.router.navigate(['/']);

    }).catch(err => {
      this.flashMsg.show(err.message, { cssClass: 'alert-danger', timeout: 2000 });
    });
  }
}
