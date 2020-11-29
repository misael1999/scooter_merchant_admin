import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
import { ZonesService } from 'src/app/services/zones.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { AddZoneDialogComponent } from '../add-zone-dialog/add-zone-dialog.component';

@Component({
  selector: 'app-main-zones',
  templateUrl: './main-zones.component.html',
  styleUrls: ['./main-zones.component.scss']
})
export class MainZonesComponent extends ValidationForms implements OnInit {

  loadingArea: boolean;
  paths = [];
  zones = [];
  // Poligonos con todas las zonas
  polygones = [];
  merchant: any;
  restricted_zones_activated: boolean;
  operational_zones_activated: boolean;

  constructor(private zonesService: ZonesService,
    private dialog: MatDialog, private profileService: ProfileService) { super() }

  ngOnInit(): void {
    this.getmerchant();
    this.getArea();
    this.getZones();
  }

  getmerchant() {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
    if (this.merchant.operational_zones_activated !== null) {
      this.operational_zones_activated = this.merchant.operational_zones_activated;
      this.restricted_zones_activated = this.merchant.restricted_zones_activated;
    }
  }

  async changeSlidePromotions(e) {
    this.operational_zones_activated = e.source.checked;

    // this.allowCancellations = true;
    const resp = await this.showMessageConfirm((e.source.checked ? 'Activar' : 'Desactivar') + ' operatividad por zonas');
    if (resp.dismiss) {
      this.operational_zones_activated = !this.operational_zones_activated;
      return;
    } else {
      this.saveConfigInfo();
    }

  }

  async changeSlideRestricted(e) {
    this.restricted_zones_activated = e.source.checked;

    // this.allowCancellations = true;
    const resp = await this.showMessageConfirm((e.source.checked ? 'Activar' : 'Desactivar') + ' restricciones por zonas');
    if (resp.dismiss) {
      this.restricted_zones_activated = !this.restricted_zones_activated;
      return;
    } else {
      this.saveConfigInfo();
    }

  }


  saveConfigInfo() {

    const general = {
      restricted_zones_activated: this.restricted_zones_activated,
      operational_zones_activated: this.operational_zones_activated,
    };
    this.profileService.updateMerchant({ general })
      .subscribe((data: any) => {
        // this.showSwalMessage('Configuración actualizada correctamente');
        // this.loadingSaveInfo = false;
        localStorage.setItem('merchant', JSON.stringify(data.data));
        // this.isChangeConfig = false;
        // location.reload();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        // this.loadingSaveInfo = false;
      });

  }

  getArea() {
    this.loadingArea = true;
    this.zonesService.getAreaByMerchant()
      .subscribe((data: any) => {
        this.loadingArea = false;
        this.setPolygon(data.poly.coordinates);
      }, error => {
        this.loadingArea = false;
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  getZones() {
    this.zonesService.getZones()
      .subscribe((data: any) => {
        this.zones = data.results;
      }, error => {
        alert(error.errors.message);
      });
  }

  openDialog(zone = null) {
    const dialogRef = this.dialog.open(AddZoneDialogComponent, {
      disableClose: true,
      minWidth: '60%',
      minHeight: '500px',
      data: { zone }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getZones();
        }
      });
  }

  setPolygon(coordinates) {
    for (const points of coordinates) {
      for (const coordinate of points) {
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
      }
    }
  }

  /*   setPolygonesByZones(zones) {
      for (const zone of zones) {
        for (const points of zones.poly.coordinates) {
          for (const coordinate of points) {
            this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
          }
        }
      }
    } */

}
