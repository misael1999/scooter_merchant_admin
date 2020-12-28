import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-profile',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleProfileComponent implements OnInit {

  @Input() schedule: any;
  @Output() addSchedule = new EventEmitter<object>();

  openingHour = '09:00:00';
  closedHour = '18:00:00';

  constructor() { }

  ngOnInit(): void {
    console.log(this.schedule);
    this.openingHour = this.schedule.from_hour;
    this.closedHour = this.schedule.to_hour;
  }

  selectCheckbox(event) {
    this.sendSchedule();
  }


  sendSchedule() {
    this.addSchedule.emit({
      schedule_id: this.schedule.schedule_id,
      is_open: this.schedule.is_open,
      from_hour: this.openingHour,
      to_hour: this.closedHour,
      // checked: this.schedule.checked
    });
  }




}
