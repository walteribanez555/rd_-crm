export interface RolForm{

  area: string,

  area_permissions : string[],

}


export enum OptionsRol{
  post  = "post",
  read  = "read",
  update = "update",
  delete = "delete",

}
