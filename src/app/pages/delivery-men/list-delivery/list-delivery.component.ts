import { Component, OnInit } from '@angular/core';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  params = { limit: 15, offset: 0, search: '', ordering: '', status: 1 };
  deliverys: Array<any> = [];

  loadingDelivery: boolean;



  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  dialogAddDelivery() {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      disableClose: true,
      // width: '600px',
      // height: '700px',
      data: { delivery: null }
    });
  }


  // Metodo paginator
  getPages(e): PageEvent {
    if (this.deliverys.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    // this.getDelivery();
  }
  // ==========================================



}
