import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from "../../models/Client";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;
  constructor(private falshMessage: FlashMessagesService,
    private clientservice: ClientService,
    private router: Router,
    private setting: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.setting.getSettings().disableBalanceOnAdd;
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // Show Error
      this.falshMessage.show("Please fill out the Form Correctly", { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      // Add CLient to FireBase
      this.clientservice.newClient(value);
      // Show Message
      this.falshMessage.show("New user Has been added", { cssClass: 'alert-success', timeout: 4000 });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }
}
