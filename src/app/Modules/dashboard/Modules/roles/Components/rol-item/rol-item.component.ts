import {  Component, Input } from '@angular/core';
import { Rol } from 'src/app/Modules/core/models/Rol';

@Component({
  selector: 'rol-item-view',
  templateUrl : 'rol-item.component.html',
  styleUrls: ['./rol-item.component.css'],
})
export class RolItemComponent {


  @Input() rol! : Rol;


}
