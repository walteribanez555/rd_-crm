import { Component, Input, OnInit, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TypeUser, enumTypeUser } from '../../interfaces/TypeUser.interface';

@Component({
  selector: 'type-user',
  templateUrl: './type-user.component.html',
  styleUrls: ['./type-user.component.css']
})
export class TypeUserComponent implements OnInit {

  @Input() userType : enumTypeUser = enumTypeUser.INTERNAL

  options : TypeUser[]  =  [
    {
      name  : enumTypeUser.INTERNAL,
      state : false,
      description : "Usuario Cliente",
    },
    {
      name : enumTypeUser.CLIENTE,
      state : false,
      description : "Usuario Administrativo",

    },
    {
      name : enumTypeUser.INVITED,
      state : false,
      description : "Invitado",

    }
  ]


  ngOnInit(): void {

    this.options = this.options.map( option => {

      if(option.name === this.userType){
        return{
          name : option.name,
          state : true,
          description : option.description,
        }
      }

      return option
    })
  }


  @Input() inputControl!: FormControl | null;

  onChangeOption( option : TypeUser){

    const changedOption = option.state;

    this.options.forEach( localOption => {
      localOption.state = false;

    })

    option.state = changedOption;
    this.changeFormControlValue(option);

  }

  changeFormControlValue(option : TypeUser){
    if(option.state){
      this.inputControl?.setValue(option.name);
    }
    else{
      this.inputControl?.setValue(null);
    }

  }



  // const stateBeneficio : boolean = beneficio.subDropdownOpen;

  //     this.beneficioData.forEach(
  //       beneficio => beneficio.subDropdownOpen = false
  //     )

  //     beneficio.subDropdownOpen = stateBeneficio;

  //     this.changeFormControlValue(beneficio);
}
