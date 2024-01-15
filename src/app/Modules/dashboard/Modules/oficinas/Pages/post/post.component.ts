import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeComponent } from '@odymaui/angular-tree-component';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { Observable, Subject } from 'rxjs';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { Oficina, OficinaPost } from 'src/app/Modules/core/models/Oficina';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';

interface Elemento {
  id: number;
  nombre: string;
  parentId: number | null;
  hijos : Elemento[]
}


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {


  generateOficce() {


    console.log(this.formOffice.value);

    if( !this.formOffice.valid){
      this.onError("Revise los detalles");
      return;
    }

    const proccess = new Subject();

    const observerProcess = proccess.asObservable();

    this.onLoading(observerProcess);


    const { office_name, country, city, phone, email, address, office_dep} = this.formOffice.value;

    const nuevaOficina : OficinaPost = {
      office_name : (office_name as string).toLocaleUpperCase().trimEnd(),
      email,
      city,
      address,
      country,
      phone,
      office_dep : (office_dep as Oficina).office_code,
      status : 1,
      office_level : (office_dep as Oficina).office_level+ 1,
    }

    this.oficinasService.post(nuevaOficina).subscribe({
      next : (resp ) => {
        proccess.complete();
        this.onSuccess("Oficina Creada Exitosamente");
      },
      error : (err) => {
        proccess.complete();
        this.onError("No se relleno correctamente");
      },
      complete : () => {

      }
    })


  }


  formOffice : FormGroup = new FormGroup({
    office_name : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
    city : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    address : new FormControl('',[Validators.required]),
  })

  office_dep = new FormControl('',null);




  ngOnInit(): void {

    this.formOffice.addControl('office_dep', this.office_dep);


  }

  private notificacionesModalService = inject(NotificationService);


  @ViewChild(TreeComponent)
  private tree!: TreeComponent;
  private oficinasService = inject(OficinasService);

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






  createOffice(){
    this.nodes.push({
      name: this.formOffice.value.oficina_name,
      children: [],
    });
    this.tree.treeModel.update();
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
}
