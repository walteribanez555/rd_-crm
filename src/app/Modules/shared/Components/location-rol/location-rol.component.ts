import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rol } from 'src/app/Modules/core/models/Rol';

@Component({
  selector: 'location-rol',
  template: `
  <div class="card selected"   (click)="changeLocation()">
    <i class="fa-solid fa-globe selected" ></i>
    <span class="selected" >{{location.rol_name}}</span>
    <span class="icon selected" (click)="changeLocation()" >x</span>

  </div>`,
  styleUrls: ['./location-rol.component.css'],
})
export class LocationRolComponent {


  @Input() location! : Rol;

  @Input() position! : number;

  @Output() selectionChanged = new EventEmitter<number>();



  changeLocation() {
    this.selectionChanged.emit(this.position);
  }



  // location : string = "Destino";



}
