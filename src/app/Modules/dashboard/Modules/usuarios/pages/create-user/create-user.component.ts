import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { UserService } from 'src/app/Modules/core/services/user.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
    this.userForm.setControl('phone', this.telf_user);
  }

  private notificacionModalService = inject(NotificationService);
  private userService = inject(UserService);
  telf_user : FormControl = new FormControl(null, [Validators.required]);




  onSelectOffice(resp : Oficina) {
    this.oficinasSelected.push(resp);
  }

  onSelectRol( resp : Rol){
    this.rolesSelectd.push(resp);
  }

  rolesSelectd : Rol[] = [];
  oficinasSelected : Oficina[] = [];


  changeOffices( pos : any) {
    this.oficinasSelected.splice(pos, 1);

  }

  changeRoles( pos : any) {
    this.rolesSelectd.splice(pos,1);
  }

  userForm : FormGroup = new FormGroup({
    username : new FormControl(null, [Validators.required]),
    user_type : new FormControl('REDCARD' , [Validators.required]),
    password : new FormControl(null, [Validators.required]),
    confirm : new FormControl(null, [Validators.required]),
    first_name : new FormControl(null, [Validators.required]),
    last_name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required]),
    phone : new FormControl(null, [Validators.required]),
    rol_id : new FormControl('', [Validators.required]),
    office_id : new FormControl('', [Validators.required]),
  });


  submitForm() {




    this.userForm.get('office_id')?.setValue(''+(this.oficinasSelected.map(ofi => {return ofi.office_id}).join(',')));
    this.userForm.get('rol_id')?.setValue(''+ this.rolesSelectd.map(rol => { return rol.rol_id}).join(','));


    console.log(this.userForm.value);

    if(!this.userForm.valid){
      this.onError("Rellenar Correctamente los detalles de los usuarios");
      return;
    }


    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.userService.createUser(this.userForm.value).subscribe({
      next : (resp => {
        process.complete();
        this.onSuccess("Usuario Agregado Correctamente");
        this.userForm.reset();

      }),
      error : (err => {
        process.complete();
        this.onError(err);

      }),
      complete : (() => {

      })
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
