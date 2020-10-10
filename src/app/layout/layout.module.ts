import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { MessagesComponent } from './header/messages/messages.component';
import { UserInformationComponent } from './header/user-information/user-information.component';
import { SearchComponent } from './header/search/search.component';
import { RouterModule } from '@angular/router';
import { ToggleOrdersComponent } from './header/toggle-orders/toggle-orders.component';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NotificationsComponent,
    MessagesComponent,
    UserInformationComponent,
    SearchComponent,
    ToggleOrdersComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule
  ]
})
export class LayoutModule { }
