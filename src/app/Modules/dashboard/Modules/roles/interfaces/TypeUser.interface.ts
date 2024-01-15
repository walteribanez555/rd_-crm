export enum enumTypeUser{


  INTERNAL = "INTERNAL",
  CLIENTE  = "CLIENTE",
  INVITED = "INVITADO",
}


export interface  TypeUser{
  name : enumTypeUser,
  description : string,
  state : boolean,

}
