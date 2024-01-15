import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, switchMap, throwError, forkJoin, catchError, of } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { User } from 'src/app/Modules/core/models/User';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { RolesService } from 'src/app/Modules/core/services/roles.service';
import { UserService } from 'src/app/Modules/core/services/user.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit {
  ngOnInit(): void {

    const process = new Subject();
    const observer = process.asObservable();

    this.onLoading(observer);

    this.Router.params.subscribe( params => {
      this.userService.getUser(params['id']).pipe(
        switchMap(
          resp => {
            this.user = resp[0];

            if(resp.length ===0){
              return throwError("Usuario no encontrado");
            };

            const requests : any[] = this.user.rol_id.split(',').map(rol => this.rolService.getById(rol));
            return forkJoin(requests).pipe(
              catchError(
                err => {
                  return of([]);
                }
              )
            );
          }
        ),
        switchMap(
          (resp : Rol[][])=> {
            this.rolesSelectd = resp.flat();

            const requests : any[] = this.user!.office_id.split(',').map(ofi => this.oficinasService.getById(ofi));
            return forkJoin(requests).pipe(
              catchError(
                err => {
                  return of([]);
                }
              )
            );
          }
        )


      ).subscribe({
        next : (resp  : Oficina[][]) => {
          process.complete();
          this.oficinasSelected= resp.flat();
          // console.log({
          //   usuario : this.user!,
          //   oficinas : this.oficinasSelected,
          //   roles : this.rolesSelectd
          // });


          this.userForm =new FormGroup({
            username : new FormControl(this.user!.username, [Validators.required]),
            user_type : new FormControl(this.user!.user_type , [Validators.required]),
            password : new FormControl(null, [Validators.required]),
            confirm : new FormControl(null, [Validators.required]),
            first_name : new FormControl(this.user!.first_name, [Validators.required]),
            last_name : new FormControl(this.user!.last_name, [Validators.required]),
            email : new FormControl(this.user!.email, [Validators.required]),
            phone : new FormControl(this.user!.phone, [Validators.required]),
            rol_id : new FormControl('', []),
            office_id : new FormControl('', []),
          });

          this.userForm.setControl('phone', this.telf_user);


          console.log(this.user?.phone);
          this.userForm.get('phone')?.setValue(this.user?.phone);





        },
        error : (err) => {
          this.onError(err);

        },
        complete : () => {

        }
      })
    });
  }
  private notificacionModalService = inject(NotificationService);
  private userService = inject(UserService);
  private rolService = inject(RolesService);
  private oficinasService  = inject(OficinasService);
  private Router = inject(ActivatedRoute);
  user : User | null = null;
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

  userForm? : FormGroup;


  submitForm() {




    this.userForm?.get('office_id')?.setValue(''+(this.oficinasSelected.map(ofi => {return ofi.office_id}).join(',')));
    this.userForm?.get('rol_id')?.setValue(''+ this.rolesSelectd.map(rol => { return rol.rol_id}).join(','));


    if(!this.userForm?.valid){
      console.log(this.userForm);
      this.onError("Rellenar Correctamente los detalles de los usuarios");
      return;
    }

    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);


    this.userService.updateUser(this.user!.username, this.userForm?.value).subscribe({
      next : (resp) => {
        process.complete();
        this.onSuccess("Usuario Actualizado Correctamente");

      },
      error : (err ) => {
        process.complete();
        this.onError(err);
      },
      complete : () => {

      }


    })
  }


  onUpdateState( state : number) {
    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.userService.updateUser(this.user!.username , {status : state , email : this.user?.email }).subscribe({
      next : ( resp ) => {
        process.complete();
        this.onSuccess("Usuario Actualizado");
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
