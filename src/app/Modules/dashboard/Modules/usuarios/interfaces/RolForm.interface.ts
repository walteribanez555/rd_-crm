export interface RolForm{

  area: string,

  area_permissions : string[],
  action_permissions : number[] | null,

}


export enum OptionsRol{
  post  = "post",
  read  = "read",
  update = "update",
  delete = "delete",

}
