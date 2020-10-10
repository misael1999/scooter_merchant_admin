import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // merchant: Array<any> = [];
  merchant;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getmerchant();
  }

  getmerchant() {
    this.profileService.getMerchant()
      .subscribe((data: any) => {
        this.merchant = data;
        console.log('La informacion', this.merchant);
        this.profileService.merchant = this.merchant;
        localStorage.setItem('merchant', JSON.stringify(this.merchant));

      }, error => {
        console.log(error);
        // return;
      });
  }

}
