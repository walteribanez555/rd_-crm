import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css'],
})
export class CustomCalendarComponent implements OnInit {
  week: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any;

  @Output() onSelectDate = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    const actualDate = new Date();

    this.getDaysFromDate(actualDate.getMonth() + 1, actualDate.getFullYear());
  }

  getDaysFromDate(month: any, year: any) {
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');

    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = [];
    for (let i = 0; i < numberDays; i++) {
      const dayObject = startDate.clone().add(i, 'days');
      arrayDays.push({
        name: dayObject.format('dddd'),
        value: dayObject.date(),
        indexWeek: dayObject.isoWeekday(),
      });
    }

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: any, pos: any) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    this.onSelectDate.emit(objectDate.format().split('T')[0]);
  }

  isTheDate(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);

    if (
      this.dateValue &&
      objectDate &&
      this.dateValue.isSame(objectDate, 'day')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
