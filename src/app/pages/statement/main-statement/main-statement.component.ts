import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-statement',
  templateUrl: './main-statement.component.html',
  styleUrls: ['./main-statement.component.scss']
})
export class MainStatementComponent implements OnInit {

  date = null;
  month = '';
  year = '';

  constructor() { }

  ngOnInit(): void {
    const now = new Date();
    this.month = this.getMonthName(now.getMonth() + 1);
    this.year = now.getFullYear().toString();
    this.date = now;
  }

  changeDate(result: Date): void {
    this.month = this.getMonthName(result.getMonth() + 1);
    this.year = result.getFullYear().toString();

  }

  getMonthName(month) {
    switch(month) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
    }
  }

}
