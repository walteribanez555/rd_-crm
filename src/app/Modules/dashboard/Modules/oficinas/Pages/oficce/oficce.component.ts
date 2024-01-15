import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { Observable, Subject, of } from 'rxjs';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TreeComponent } from '@odymaui/angular-tree-component';
import { Oficina, OficinaPost } from 'src/app/Modules/core/models/Oficina';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';

@Component({
  templateUrl: './oficce.component.html',
  styleUrls: ['./oficce.component.css'],
})
export class OficceComponent implements OnInit {


  private router = inject(ActivatedRoute);
  private oficinasService = inject(OficinasService);
  private notificacionesModalService = inject(NotificationService);
  private Router = inject(ActivatedRoute);

  oficina: Oficina | null = null;
  process? : Subject<any>;
  observerProcess?: Observable<any>;

  ngOnInit(): void {
    this.mapDataToForm();
  }


  mapDataToForm() {
    this.formOffice.addControl('office_dep', this.office_dep);

    this.process = new Subject();
    this.observerProcess = this.process.asObservable();

    this.onLoading(this.observerProcess);

    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.oficinasService.getById(id).subscribe({
        next: (resp) => {
          this.oficinasService.getAll().subscribe((oficinas) => {


            this.oficina = resp[0];


            this.formOffice
              .get('office_name')
              ?.setValue(this.oficina.office_name);
            this.formOffice.get('country')?.setValue(this.oficina.country);
            this.formOffice.get('city')?.setValue(this.oficina.city);
            this.formOffice.get('phone')?.setValue(this.oficina.phone);
            this.formOffice.get('status')?.setValue(this.oficina.status);
            this.formOffice.get('email')?.setValue(this.oficina.email);
            this.formOffice.get('address')?.setValue(this.oficina.address);
            const ofi_dep = oficinas.filter(
              (ofi) => ofi.office_code === this.oficina!.office_dep
            );

            if( ofi_dep.length> 0) {
              this.formOffice.get('office_dep')?.setValue(oficinas.filter(
                (ofi) => ofi.office_code === this.oficina!.office_dep
              )[0]);
            }


            this.process?.next(oficinas.filter(
              (ofi) => ofi.office_code === this.oficina!.office_dep
            )[0])

            this.process?.complete();


          });

        },
        error: (err) => {
          this.process?.complete();
          this.onError(err);
        },
        complete: () => {
        },
      });
    });
  }

  ondelete() {
    const process = new Subject<any>();
    const observerProcess = process.asObservable();
    this.onLoading(observerProcess);

    this.oficinasService.delete(this.oficina!.office_id).subscribe({
      next: (resp) => {
        process.complete();
        this.onSuccess('Oficina Id eliminada');
      },
      error: (err) => {
        process.complete();
        this.onError(err);
      },
      complete: () => {},
    });
  }

  onSuccess(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionesModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionesModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }

  updateOffice() {
    console.log(this.formOffice.value);

    if (!this.formOffice.valid) {
      this.onError('Revise los detalles');
      return;
    }

    const proccess = new Subject();

    const observerProcess = proccess.asObservable();

    this.onLoading(observerProcess);

    const { office_name, country, city, phone, email, address, office_dep, status } =
      this.formOffice.value;

    const nuevaOficina: OficinaPost = {
      office_name: (office_name as string).toLocaleUpperCase().trimEnd(),
      email,
      city,
      address,
      country,
      phone,
      office_dep: (office_dep as Oficina).office_code,
      status,
      office_level: (office_dep as Oficina).office_level + 1,
    };

    this.oficinasService.update(this.oficina!.office_id,nuevaOficina).subscribe({
      next: (resp) => {
        proccess.complete();
        this.onSuccess('Oficina Actualizada Correctamente');
      },
      error: (err) => {
        proccess.complete();
        this.onError('No se relleno correctamente');
      },
      complete: () => {},
    });
  }

  formOffice: FormGroup = new FormGroup({
    office_name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    status : new FormControl(1, [Validators.required]),
  });

  office_dep = new FormControl(null, null);

  @ViewChild(TreeComponent)
  private tree!: TreeComponent;

  options = {
    allowDrag: false,
    allowDrop: false,
    getNodeClone: (node: any) => ({
      ...node.data,
      id: new Date().getTime,
      name: `copy of ${node.data.name}`,
    }),
  };
  nodes: any = [];

  createOffice() {
    this.nodes.push({
      name: this.formOffice.value.oficina_name,
      children: [],
    });
    this.tree.treeModel.update();
  }


  changeStatus(){
    this.oficina!.status = this.oficina!.status == 1 ? 2 : 1;
    this.process = new Subject();
    this.observerProcess = this.process.asObservable();

    this.onLoading(this.observerProcess);

    this.oficinasService.update(this.oficina!.office_id, {status : this.oficina!.status == 1 ? 1 : 2}).subscribe({
      next : (resp) => {
        this.process?.complete();
        this.onSuccess("Estado Actualizado Correctamente");
      },
      error : (err ) => {
        this.process?.complete();
        this.onError(err);
      },
      complete : () => {

      }
    })
  }
}
