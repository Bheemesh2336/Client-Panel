import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from "angular2-flash-messages";
import { Settings } from "../../models/Settings";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(private router: Router,
    private falshmessage: FlashMessagesService,
    private settingservice: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingservice.getSettings();
  }
  OnSubmit() {
    this.settingservice.changeSettings(this.settings);
    this.falshmessage.show("Your Settings are Updated", { cssClass: 'alert-success', timeout: 1500 });
  }
}
