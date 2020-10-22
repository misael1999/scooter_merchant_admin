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

/*   public openOpeningHourPicker() {
    const amazingTimePicker = this.atp.open(
      this.getConfigTimePicker(this.openingHour)
      );
    amazingTimePicker.afterClose()
      .subscribe(time => {
        this.openingHour = time;
        this.sendSchedule();
      });
  } */

/*   openClosedHourPicker() {
    const amazingTimePicker = this.atp.open(
      this.getConfigTimePicker(this.closedHour)
    );
    amazingTimePicker.afterClose()
      .subscribe(time => {
        this.closedHour = time;
      });
  } */

  sendSchedule() {
    this.addSchedule.emit({
      schedule_id: this.schedule.schedule_id,
      from_hour: this.openingHour,
      to_hour: this.closedHour,
      checked: this.schedule.checked
    });
  }

 /*  getConfigTimePicker(time: string): object {
    return {
      time,
      theme: 'light',
      preference: {
        labels: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      },
      arrowStyle: {
        background: 'orange',
        color: 'white'
      }
    };
  } */



}
