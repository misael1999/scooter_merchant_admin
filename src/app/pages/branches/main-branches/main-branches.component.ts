import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main-branches',
  templateUrl: './main-branches.component.html',
  styleUrls: ['./main-branches.component.scss']
})
export class MainBranchesComponent implements OnInit {

  branches = [];

  params = {
    limit: 25,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  };

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {

  }

  orderBy(value) {

  }

  searchBy(value) {

  }

  getBranches() {

  }

  getPage(e: any): PageEvent {
    if (this.branches.length === 0) {
      this.pageSize = 15;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getBranches();
  }

}
