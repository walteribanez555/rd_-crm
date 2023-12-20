import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { DescuentoToPost } from 'src/app/Modules/core/models/Descuento.model';
import { DescuentosService } from 'src/app/Modules/core/services';
import { PositionMessage, Size } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  styleUrls: ['./create-descuento.component.css'],
  templateUrl : './create-descuento.component.html'
})
export class CreateDescuentoComponent implements OnInit {
  ngOnInit(): void {
    this.formGroup = this.createForm();

  }


    tipo  = new FormControl(null, [Validators.required, Validators.min(1)]);
    cantidad  = new FormControl(null, [Validators.required, Validators.min(1)]);
    valor  = new FormControl(null,[Validators.required, Validators.min(1)]);
    fecha_desde  = new FormControl(null,[Validators.required]);
    fecha_hasta  = new FormControl(null, [Validators.required]);


    formGroup : FormGroup | null = null;


    private descuentosService = inject(DescuentosService);
    private notificacionesModalService = inject(NotificationService);



  createForm( ) {
    return new FormGroup({
      tipo : this.tipo,
      cantidad : this.cantidad,
      valor : this.valor,
      fecha_desde : this.fecha_desde,
      fecha_hasta : this.fecha_hasta,
    })
  }


  onLoadForm() {

    const onProcces = new Subject();

    const observerProcess : Observable<any> = onProcces.asObservable();

    if(!this.formGroup?.valid){
      console.log(this.formGroup);
      this.onError("Rellena correctamente el Formulario");
      return;
    }

    let {tipo, cantidad, valor, fecha_desde, fecha_hasta} = this.formGroup?.value;
    fecha_desde = (fecha_desde as string).split('-').reverse().join('-');
    fecha_hasta = (fecha_hasta as string).split('-').reverse().join('-');


    const nuevoDescuento : DescuentoToPost = {
      tipo_valor : tipo,
      cantidad : cantidad,
      valor : valor,
      fecha_desde : fecha_desde,
      fecha_hasta : fecha_hasta,
      status : 1,
    };


    this.onLoading(observerProcess);


    this.descuentosService.create(nuevoDescuento).subscribe({
      next : ( data ) => {
        onProcces.complete();
        this.onSuccess("Creada Exitosamente");
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
