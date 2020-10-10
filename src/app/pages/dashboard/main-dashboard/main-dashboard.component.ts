import { Component, OnInit, OnDestroy } from '@angular/core';
import { Point, Coordinate } from 'src/app/models/coordinate';
import { Subscription } from 'rxjs';
import { MerchantService } from 'src/app/services/merchant.service';
import { Merchant } from 'src/app/models/merchant.model';
import { MarkerManager, AgmMarker } from '@agm/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, OnDestroy {

  userCoordinate: Coordinate;
  merchantsSubscription: Subscription;
  merchants: Merchant[];

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data: Position) => {
          this.userCoordinate = Coordinate.fromGeoposition(data);
        }
      );
    }

    this.getMerchants();
  }

  ngOnDestroy(): void {
    if (this.merchantsSubscription) {
      this.merchantsSubscription.unsubscribe();
    }
  }

  getMerchants(): void {
    this.merchantsSubscription = this.merchantService.getMerchants()
    .subscribe(
      (data: any) => {
        this.merchants = data.results;
        console.log(this.merchants);
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

}
