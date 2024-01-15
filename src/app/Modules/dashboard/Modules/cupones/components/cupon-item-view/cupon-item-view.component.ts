import {Component, Input, OnInit, inject } from '@angular/core';
import { Cupon } from 'src/app/Modules/core/models/Cupon.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { ServiciosService } from 'src/app/Modules/core/services';

@Component({
  selector : 'cupon-item-view',
  templateUrl : './cupon-item-view.component.html',
  styleUrls: ['./cupon-item-view.component.css'],
})
export class CuponItemViewComponent  implements OnInit {
  ngOnInit(): void {
    this.servicioService.getOne(this.cupon.servicio_id).subscribe({
      next :( resp ) => {
        console.log({resp});
        this.servicio = resp[0];
      },
      error : (err) => {
        console.log({err});
      },
      complete : ( ) => {

      }
    })

  }


  private servicioService = inject(ServiciosService);


  @Input() cupon! : Cupon;

  servicio : Servicio | null = null;

}
