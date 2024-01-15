import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Rol, RolToPost } from 'src/app/Modules/core/models/Rol';
import { RolesService } from 'src/app/Modules/core/services/roles.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
// import { RolService } from 'src/app/Modules/shared/services/requests/rol.service';

@Component({
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {



  private rolService = inject(RolesService);
  private notificacionModalService = inject(NotificationService);





  // private readonly rolService = inject(RolService);

  isLoading : boolean = false


  ngOnInit(): void {







    this.inputControl= this.rolForm.get('rol_structure') as FormControl<any>;

  }

  public inputControl: FormControl<any> | null = null;



  public rolForm : FormGroup = new FormGroup({
    rol_name  : new FormControl(null, [Validators.required]),
    rol_structure : new FormControl(null, [Validators.required]),
  })


  submitForm(){

    if(!this.rolForm.valid){
      this.onError("Rellene correctamente");
      return;
    }


    const { rol_name, rol_structure} = this.rolForm.value;


    const nuevoRol : RolToPost = {
      rol_name,
      rol_structure,
      status :1
    }

    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);


    this.rolService.create(nuevoRol).subscribe({
      next : ( resp ) => {
        process.complete();
        this.onSuccess("Rol Creado Exitosamente");
      },
      error : (err) => {
        process.complete();
        this.onError(err);
      },
      complete : () => {

      }
    })


  }



  onSuccess(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }



}
