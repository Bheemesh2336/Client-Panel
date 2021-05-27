import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService) { }

  ngOnInit(): void {

  }

  OnSubmit() {
    this.authService.register(this.email, this.password).then(res => {
      this.flashMsg.show('You are now Registered and Logged In', { cssClass: 'alert-sucess', timeout: 3000 });
      this.router.navigate(['/']);
    })
      .catch(err => {
        this.flashMsg.show(err.message, { cssClass: 'alert-sucess', timeout: 3000 });
      });
  }
}











































































