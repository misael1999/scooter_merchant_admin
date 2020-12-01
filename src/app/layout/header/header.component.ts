import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/models/merchant.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  merchant: Merchant;

  constructor(private authService: AuthService) {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
