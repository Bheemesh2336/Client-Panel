import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(private clientservices: ClientService,
    private router: Router,
    private acvroute: ActivatedRoute,
    private falshmessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // get Id from URL
    this.id = this.acvroute.snapshot.params[`id`];
    // Get Client
    this.clientservices.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }
  updateBalance() {
    if (this.client.balance > 0) {
      this.clientservices.updateClient(this.client);
      this.falshmessage.show("Balance Has been Udpated", { cssClass: "alert-success", timeout: 2000 });
    } else {
      this.falshmessage.show("Balance Should be greater than zero", { cssClass: "alert-danger", timeout: 2000 });
    }
  }
  onDeleteClick() {
    if (confirm('Are You Sure?')) {
      this.clientservices.deleteClient(this.client);
      this.falshmessage.show("Client has been Removed", { cssClass: "alert-success", timeout: 2000 });
      this.router.navigate(['/']);
    }
  }
}
