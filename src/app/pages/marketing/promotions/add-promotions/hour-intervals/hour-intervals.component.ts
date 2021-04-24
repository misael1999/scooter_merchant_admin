import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hour-intervals',
  templateUrl: './hour-intervals.component.html',
  styleUrls: ['./hour-intervals.component.scss']
})
export class HourIntervalsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HourIntervalsComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
