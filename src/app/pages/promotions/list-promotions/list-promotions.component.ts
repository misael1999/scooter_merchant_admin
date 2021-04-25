import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.scss']
})
export class ListPromotionsComponent implements OnInit {
  @Input() promotions;

  constructor() { }

  ngOnInit(): void {
  }

}
