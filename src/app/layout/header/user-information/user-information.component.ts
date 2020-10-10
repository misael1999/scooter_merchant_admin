import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Merchant } from 'src/app/models/merchant.model';
import { Marketer } from 'src/app/models/marketer.model';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  @Input() marketer: Marketer;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.marketer.full_name);
  }

  logout() {
    this.authService.logout();
  }

}
