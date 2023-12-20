import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Descuento, DescuentoToPost } from 'src/app/Modules/core/models/Descuento.model';
import { DescuentosService } from 'src/app/Modules/core/services';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl : './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditDescuentoComponent  implements OnInit{

  isReadyForm : boolean = false;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_descuento = params['id'];

      this.descuentosService.getOne(this.id_descuento!).subscribe(descuento => {


        this.descuentos = descuento;

          this.cantidad = new FormControl(descuento[0].cantidad, Validators.required),
          this.descuento_id = new FormControl(descuento[0].descuento_id, Validators.required),
          this.fecha_desde = new FormControl(descuento[0].fecha_desde.split('T')[0].split('-').reverse().join('-'), Validators.required),
          this.fecha_hasta = new FormControl(descuento[0].fecha_hasta.split('T')[0].split('-').reverse().join('-'), Validators.required),
          this.tipo_valor = new FormControl(descuento[0].tipo_valor, Validators.required),
          this.valor = new FormControl(descuento[0].valor, Validators.required),

        this.editDescForm = new FormGroup({
          cantidad : this.cantidad,
          descuento_id : this.descuento_id,
          fecha_desde : this.fecha_desde,
          fecha_hasta : this.fecha_hasta,
          tipo_valor : this.tipo_valor,
          valor : this.valor,
        })


        this.isReadyForm = true;


      })

    })


  }


  cantidad : FormControl | null = null;
  descuento_id : FormControl | null = null;
  fecha_desde : FormControl | null  = null;
  fecha_hasta : FormControl | null = null;
  tipo_valor : FormControl | null = null;
  valor : FormControl | null = null;



  editDescForm : FormGroup | null = null;

  private route = inject(ActivatedRoute);
  private descuentosService = inject(DescuentosService);

  id_descuento : number | null = null;
  descuentos : Descuento[] | null = null;
  private notificacionesModalService = inject(NotificationService);



  onUpdateDescuento() {
    const onProcces = new Subject();

    const observerProcess : Observable<any> = onProcces.asObservable();

    if(!this.editDescForm?.valid){
      this.onError("Rellena correctamente el Formulario");
      return;
    }



    let {cantidad, descuento_id, fecha_desde, fecha_hasta, tipo_valor, valor} = this.editDescForm.value;

    fecha_desde = (fecha_desde as string).split('-').reverse().join('-');
    fecha_hasta = (fecha_hasta as string).split('-').reverse().join('-');

    const nuevoDescuento : DescuentoToPost = {
      cantidad,
      fecha_desde,
      fecha_hasta,
      tipo_valor,
      valor,
      status: 1,
    }

    this.onLoading(observerProcess);

    this.descuentosService.update(descuento_id, nuevoDescuento).subscribe({
      next : ( data ) => {
        onProcces.complete();
        this.onSuccess("Actualizado correctamente");
      },
      error : ( err ) => {
        onProcces.complete();
        this.onError(err);
      },
      complete : () => {

      }

    })


  }



  onSuccess( message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration :3000,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/check.svg',
      closeOnTouch : true,
    })
  }

  onError( message : string) {
    this.notificacionesModalService.show(message, {
      size : Size.normal,
      duration : 3000,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/warning.svg',
      closeOnTouch : true,
    })
  }

  onLoading( observerProcess: Observable<any> ){
    this.notificacionesModalService.show("Cargando", {
      size: Size.normal,
      positions : [PositionMessage.center],
      imageUrl : 'assets/icons/loading.svg',
      closeOnTouch : true,
      notifier : observerProcess
    })
  }





}
