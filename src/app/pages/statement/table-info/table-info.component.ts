import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss']
})
export class TableInfoComponent implements OnInit {

  @Input() dataSummary: any;

  constructor() { }

  ngOnInit(): void {
  }

}
