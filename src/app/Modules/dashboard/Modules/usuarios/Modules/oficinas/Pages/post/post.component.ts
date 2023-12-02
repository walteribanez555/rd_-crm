import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeComponent } from '@odymaui/angular-tree-component';

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


  formOffice : FormGroup = new FormGroup({
    oficina_name : new FormControl('', [Validators.required]),
    pais : new FormControl('', [Validators.required]),
    ciudad : new FormControl('', [Validators.required]),
    encargado : new FormControl(1, null),
    telefono : new FormControl('', null),
    email : new FormControl('', null),
    direccion : new FormControl('', null),
    aniversary : new FormControl('', null),
  })



  ngOnInit(): void {


  }

  @ViewChild(TreeComponent)
  private tree!: TreeComponent;

  options = {
    allowDrag: true,
    allowDrop: true,
    getNodeClone: (node: any) => ({
      ...node.data,
      id: new Date().getTime,
      name: `copy of ${node.data.name}`,
    }),

  };
  nodes: any = [];




  generateOficce() {
    console.log(this.formOffice.value);

    this.formOffice.valid?this.createOffice():console.log("Invalido");


  }

  createOffice(){
    this.nodes.push({
      name: this.formOffice.value.oficina_name,
      children: [],
    });
    this.tree.treeModel.update();
  }
}
