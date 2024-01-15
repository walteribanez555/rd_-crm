import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { User } from 'src/app/Modules/core/models/User';

@Component({
  selector: 'item-user',

  template: `<a  routerLink="./{{user.username+''}}"  routerLinkActive="active" >
  <div class="data">
    <div class="field">
      <span >Usuario : </span>
      <span class="description" >{{user.username}}</span>
    </div>
    <div class="field">
      <span>{{user.first_name + ' ' + user.last_name}}</span>
    </div>
  </div>
  <span class="status" >{{ user.status ===1 ? "Activo" : "Inactivo" }}</span>
</a>`,
  styleUrls: ['./item-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemUserComponent {

  @Input( ) user! : User;

  listOficces : Oficina[] = [];




}
