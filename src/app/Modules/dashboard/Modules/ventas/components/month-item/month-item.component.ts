import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.css'],
})
export class MonthItemComponent {


  @Input() month! : string;
  @Input() position! : number;



  getParamsRoute(index : number) {
    const {firstDate, lastDate} = this.getFirstAndLastDateOfMonth(new Date().getFullYear(), index);
    const params = `./dashboard/reporte/ventas/data?init=${firstDate}&end=${lastDate}`;
    return params;
  }

  getFirstAndLastDateOfMonth(year: number, month: number): { firstDate: string, lastDate: string } {
    const firstDate = new Date(year, month, 1).toISOString().split('T')[0];

    const nextMonth = new Date(year, month + 1, 1);
    const lastDate = new Date(nextMonth.getTime() - 1).toISOString().split('T')[0];

    return { firstDate, lastDate };
  }



}
