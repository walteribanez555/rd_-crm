import { Component, Input } from '@angular/core';
import { Oficina } from 'src/app/Modules/core/models/Oficina';

@Component({
  selector: 'oficina-item',
  templateUrl: './oficina-item.component.html',
  styleUrls: ['./oficina-item.component.css'],
})
export class OficinaItemComponent {


  @Input()   oficina! : Oficina;



}
