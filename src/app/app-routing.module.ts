import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { RegisterGaurd } from './gaurds/register.gaurd';

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGaurd] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, canActivate: [RegisterGaurd] },
  { path: "client/add", component: AddClientComponent, canActivate: [AuthGaurd] },
  { path: "client/edit/:id", component: EditClientComponent, canActivate: [AuthGaurd] },
  { path: "client/:id", component: ClientDetailsComponent, canActivate: [AuthGaurd] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGaurd] },
  { path: "**", component: NotFoundComponent },
];
@NgModule({

  providers: [AuthGaurd, RegisterGaurd],
  exports: [RouterModule],

  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
