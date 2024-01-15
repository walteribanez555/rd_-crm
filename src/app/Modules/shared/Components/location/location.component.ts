import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'location',
  template: `
  <div class="card" [class.selected]="location.isSelected"  (click)="changeLocation()">
    <i class="fa-solid fa-globe" [class.selected]="location.isSelected"></i>
    <span [class.selected]="location.isSelected" >{{location.location.country}}</span>
    <span class="icon" (click)="changeLocation()" >x</span>

  </div>`,
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {


  @Input() location! : any;

  @Input() position! : number;

  @Output() selectionChanged = new EventEmitter<number>();



  changeLocation() {
    this.selectionChanged.emit(this.position);
  }



  // location : string = "Destino";



}
