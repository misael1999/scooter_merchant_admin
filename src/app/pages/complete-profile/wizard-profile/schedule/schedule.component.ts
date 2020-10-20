import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: ScheduleModel;
  @Output() addSchedule = new EventEmitter<object>();

  openingHour = '09:00';
  closedHour = '18:00';

  constructor() { }

  ngOnInit(): void {
  }

  selectCheckbox(event) {
    this.sendSchedule();
  }

  sendSchedule() {
    this.addSchedule.emit({
      schedule_id: this.schedule.id,
      from_hour: this.openingHour,
      to_hour: this.closedHour,
      checked: this.schedule.checked
    });
  }


}
