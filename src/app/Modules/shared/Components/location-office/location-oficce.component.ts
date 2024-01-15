import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Oficina } from 'src/app/Modules/core/models/Oficina';

@Component({
  selector: 'location-oficce',
  template: `
  <div class="card selected"  (click)="changeLocation()">
    <i class="fa-solid fa-globe selected" ></i>
    <span class="selected"  >{{location.office_name}}</span>
    <span  class="selected" (click)="changeLocation()" >x</span>

  </div>`,
  styleUrls: ['./location-oficce.component.css'],
})
export class LocationOficceComponent {


  @Input() location! : Oficina;

  @Input() position! : number;

  @Output() selectionChanged = new EventEmitter<number>();



  changeLocation() {
    this.selectionChanged.emit(this.position);
  }



  // location : string = "Destino";



}
