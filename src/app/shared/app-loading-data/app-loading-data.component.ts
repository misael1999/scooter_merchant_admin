import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-loading-data',
  templateUrl: './app-loading-data.component.html',
  styleUrls: ['./app-loading-data.component.scss']
})
export class AppLoadingDataComponent implements OnInit {
  loadingData = true;

  constructor() { }

  ngOnInit(): void {
  }

}
