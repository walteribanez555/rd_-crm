import {  Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { PlanUi } from 'src/app/Modules/shared/models/Plan.ui';
import { ExtraDetailService } from './extra-detail/extraDetail.service';

@Component({
  selector: 'extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent {

  isSelected: boolean = false;

  @Input() plan!: PlanUi;
  @Input() indexPos!: number;

  @Output() onSelectedService = new EventEmitter<number>();

  private extraDetailService = inject(ExtraDetailService);

  changeState(onSelected: boolean) {
    this.isSelected = onSelected;
    this.onSelectedService.emit(this.indexPos);
  }

  onSeeMoreDetails(modalTemplate: TemplateRef<any>) {
    const title = this.plan.beneficio.split(';')[0];
    const description = this.plan.beneficio.split(';')[1];

    this.extraDetailService.open(modalTemplate,{title, description,icono : this.plan.icono! } );
  }

 }
