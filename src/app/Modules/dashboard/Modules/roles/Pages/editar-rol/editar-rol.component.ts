import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { RolesService } from 'src/app/Modules/core/services/roles.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css'],
})
export class EditarRolComponent {




  private rolService = inject(RolesService);
  private notificacionModalService = inject(NotificationService);
  private Router = inject(ActivatedRoute);
  private router = inject(Router);



  deleteRol() {


    if(this.rol){

      const process = new Subject();
      const observerProcess = process.asObservable();
      this.onLoading(observerProcess);

      this.rolService.delete(this.rol).subscribe( resp => {
        process.complete();
        this.onSuccess("Rol Eliminado Correctamente");
        this.router.navigate(['../dashboard/roles/create']);
      })
    }
  }


  // private readonly rolService = inject(RolService);

  isLoading : boolean = false
  rol : Rol | null = null;

  ngOnInit(): void {

    const process = new Subject();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);

    this.Router.params.subscribe(params => {
      this.rolService.getById(params['id']).subscribe({
          next : (resp) => {
            this.rol = resp[0];
          },
          error : (err) => {
            process.complete();
            this.onError(err);
          },
          complete : () => {
            process.complete();
          }
      })
    })
    this.inputControl= this.rolForm.get('rol_structure') as FormControl<any>;

  }

  public inputControl: FormControl<any> | null = null;



  public rolForm : FormGroup = new FormGroup({
    rol_name  : new FormControl(null, [Validators.required]),
    rol_structure : new FormControl(null, [Validators.required]),
  })


  submitForm(){

    this.isLoading = true;
    const { rol_name, rol_structure} = this.rolForm.value;


    console.log(this.rolForm.value);
    // this.rolService.postRoles(rol_name, rol_structure).subscribe(
    //   {
    //     next :  ( data ) => {  this.isLoading = false,  console.log(data)  , this.showSucces()},
    //     error : ( error) => {  this.isLoading = false,  console.log(error) , this.showError("No se pudo crear correctamente")}
    //   }
    // )



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
