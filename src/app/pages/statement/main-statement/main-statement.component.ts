import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-main-statement',
  templateUrl: './main-statement.component.html',
  styleUrls: ['./main-statement.component.scss']
})
export class MainStatementComponent implements OnInit {

  date = null;
  month = '';
  year = '';
  dataSummary: any;
  loadingData: boolean;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    const now = new Date();
    const numberMonth = now.getMonth() + 1;
    this.month = this.getMonthName(numberMonth);
    this.year = now.getFullYear().toString();
    this.date = now;
    this.getSummaryData(numberMonth);
  }

  changeDate(result: Date): void {

    if (result != null) {
      const numberMonth = result.getMonth() + 1;
      this.month = this.getMonthName(numberMonth);
      this.year = result.getFullYear().toString();
      this.getSummaryData(numberMonth);
    }


  }

  getSummaryData(month) {
    this.loadingData = true;
    this.statisticsService.getSummaryData({ month })
      .subscribe((data) => {
        // console.log(data);
        this.dataSummary = data;
        this.loadingData = false;
      }, error => {
        this.loadingData = false;
      });

  }

  getMonthName(month) {
    switch (month) {
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
