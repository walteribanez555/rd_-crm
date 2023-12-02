import { Component, OnInit } from '@angular/core';

interface Elemento {
  id: number;
  nombre: string;
  parentId: number | null;
  hijos : Elemento[]
}



@Component({
  selector: 'list-oficces',
  templateUrl: './list-oficces.component.html',
  styleUrls: ['./list-oficces.component.css']
})
export class ListOficcesComponent implements OnInit {
  ngOnInit(): void {
    const elementos: Elemento[] = [
      { id: 1, nombre: "Elemento 1", parentId: null, hijos : [] },
      { id: 2, nombre: "Elemento 2", parentId: 1, hijos : []  },
      { id: 3, nombre: "Elemento 3", parentId: 2, hijos : []  },
      { id: 4, nombre: "Elemento 4", parentId: 2, hijos : []  },
      { id: 5, nombre: "Elemento 4", parentId: 2, hijos : []  },
      { id: 6, nombre: "Elemento 4", parentId: 1, hijos : []  },
      { id: 7, nombre: "Elemento 4", parentId: 1, hijos : []  },
      { id: 8, nombre: "Elemento 4", parentId: null, hijos : []  },
      { id: 9, nombre: "Elemento 4", parentId: null, hijos : []  },
      // ...
    ];

    // const arbolOrdenado = this.ordenarArbol(elementos);

    const arbolMapeado = this.mapToTree(elementos);
    this.nodes = arbolMapeado;


  }
  title = 'prueba-diagram';

  ordenarArbol(elementos: Elemento[], parentId: number | null = null): Elemento[] {
    const elementosOrdenados: Elemento[] = [];

    for (const elemento of elementos) {
      if (elemento.parentId === parentId) {
        const hijos = this.ordenarArbol(elementos, elemento.id);
        if (hijos.length > 0) {
          elemento.hijos = hijos;
        }
        elementosOrdenados.push(elemento);
      }
    }

    return elementosOrdenados;
  }

  mapToTree(elementos: Elemento[], parentId: number | null = null): any {
    const tree: any[] = [];

    for (const elemento of elementos) {
      if (elemento.parentId === parentId) {
        const children = this.mapToTree(elementos, elemento.id);
        const node = { name: elemento.nombre, children: [], id : elemento.id };
        if (children.length > 0) {
          node.children = children;
        }
        tree.push(node);
      }
    }

    return tree;
  }




  options = {
    allowDrag: true,
    allowDrop: true,
    getNodeClone: (node : any) => ({
      ...node.data,
      id: new Date().getTime,
      name: `copy of ${node.data.name}`
    }),
    // allowDragoverStyling: true,
    // levelPadding: 10,
    // useVirtualScroll: true,
    // animateExpand: true,
    // scrollOnActivate: true,
    // animateSpeed: 30,
    // animateAcceleration: 1.2,
  };
  nodes = [

  ];


  onMoveNode($event : any) {
    console.log(
      "Moved",
      $event.node.id,
      "to",
      $event.to.parent.id,
      "at index",
       $event.to.index);
  }

}
