import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from "../../services/settings.service";
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(private clientservices: ClientService,
    private router: Router,
    private acvroute: ActivatedRoute,
    private falshmessage: FlashMessagesService,
    private settings: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;
    // get Id from URL
    this.id = this.acvroute.snapshot.params[`id`];
    // Get Client
    this.clientservices.getClient(this.id).subscribe(client => this.client = client);
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.falshmessage.show('Please Fill Form Correctly', { cssClass: 'alert-danger', timeout: 4000 })
    } else {
      // Add Id to Client
      value.id = this.id;
      // update the client
      this.clientservices.updateClient(value);
      this.falshmessage.show('Client Updated', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
