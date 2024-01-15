import { Component, OnInit, inject } from '@angular/core';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { Observable, Subject, of, switchMap } from 'rxjs';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { OficinaUi } from 'src/app/Modules/core/models/Oficina';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';

interface Elemento {
  id: number;
  nombre: string;
  parentId: number | null;
  hijos: Elemento[];
}

@Component({
  selector: 'list-oficces',
  templateUrl: './list-oficces.component.html',
  styleUrls: ['./list-oficces.component.css'],
})
export class ListOficcesComponent implements OnInit {
  ngOnInit(): void {
    this.requestToOffices();
  }

  requestToOffices() {
    const onProccesLoading = new Subject();
    const observerProcess = onProccesLoading.asObservable();

    this.onLoading(observerProcess);

    this.oficinasService
      .getAll()
      .pipe(
        switchMap((resp) => {
          return of(
            resp.map((oficina) => {
              const oficinaUi: OficinaUi = {
                hijos: [],
                ...oficina,
              };
              return oficinaUi;
            })
          );
        })
      )
      .subscribe({
        next: (resp) => {
          // const oficina_pos = resp.findIndex( ofi => ofi.office_dep === "NO");

          // const ofs_aux = resp[oficina_pos];
          // ofs_aux.hijos = resp.splice(oficina_pos-1,1);

          // this.oficinas = [ofs_aux];
          console.log(resp);

          this.oficinas = this.ordenarArbol(resp, 'NO');
          console.log(this.oficinas);

          const nodosPrueba = this.mapToTree(
            this.oficinas,
            this.oficinas[0].office_dep
          );
          console.log({ nodosPrueba });

          const node = {
            name: this.oficinas[0].office_name,
            children: this.mapToTree(
              this.oficinas[0].hijos,
              this.oficinas[0].office_code
            ),
            id: this.oficinas[0].office_id,
          };

          this.nodes = [node as never];

          onProccesLoading.complete();
        },
        error: () => {
          onProccesLoading.complete();
          this.onError('Error en la consulta');
        },
        complete: () => {},
      });
  }

  oficinas: OficinaUi[] = [];

  private oficinasService = inject(OficinasService);
  private notificacionesModalService = inject(NotificationService);

  ordenarArbol(elementos: OficinaUi[], parentId: string): OficinaUi[] {
    const elementosOrdenados: OficinaUi[] = [];

    for (const elemento of elementos) {
      if (elemento.office_dep === parentId) {
        const hijos = this.ordenarArbol(elementos, elemento.office_code);
        if (hijos.length > 0) {
          elemento.hijos = hijos;
        }
        elementosOrdenados.push(elemento);
      }
    }

    return elementosOrdenados;
  }

  mapToTree(elementos: OficinaUi[], parentId: string): any {
    const tree: any[] = [];

    for (const elemento of elementos) {
      if (elemento.office_dep === parentId) {
        const children = this.mapToTree(elemento.hijos, elemento.office_code);
        const node = {
          name: elemento.office_name,
          children,
          id: elemento.office_id,
        };
        if (children.length > 0) {
          node.children = children;
        }
        tree.push(node);
      }
    }

    return tree;
  }

  options = {
    allowDrag: false,
    allowDrop: false,
    isExpandedField: 'expanded',
    getNodeClone: (node: any) => ({
      ...node.data,
      id: new Date().getTime,
      name: `copy of ${node.data.name}`,
    }),
    // allowDragoverStyling: true,
    // levelPadding: 10,
    // useVirtualScroll: true,
    // animateExpand: true,
    // scrollOnActivate: true,
    // animateSpeed: 30,
    // animateAcceleration: 1.2,
  };
  nodes = [];

  onMoveNode($event: any) {
    console.log(
      'Moved',
      $event.node.id,
      'to',
      $event.to.parent.id,
      'at index',
      $event.to.index
    );
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
