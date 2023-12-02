

// "{'permissions': [{'area': 'Dashboard', 'area_permissions': ['read', 'update', 'delete']}] }"

// import { RolResp } from "src/app/Modules/shared/models/Data/Rol";
// import { User } from "src/app/Modules/shared/models/Data/User.model";
import { Rol } from "../interfaces/RolComponents.interfaces";

export const updateRol = ( action : string, area : string, toAdd : boolean, permissions : string    ) : string => {

  let updatedPermissions = JSON.parse(permissions);


  const rols = toAdd ? addToRol(updatedPermissions, area , action) : deleteToRol(updatedPermissions, area , action);



  return JSON.stringify(rols);

}



const addToRol = ( permissions : any , area: string, action : string ) =>{

  const listPermissions= permissions;

  const permissionToUpdate = listPermissions.permissions.find((permission : any ) => permission.area === area);

  if(!permissionToUpdate){
    listPermissions.permissions.push({
        area,
        area_permissions : [
          action
        ]
      }
    );
  }else{
    const actionToAdd = permissionToUpdate.area_permissions.find( (option : string) => option === action);

    if(!actionToAdd){
      permissionToUpdate.area_permissions = [...permissionToUpdate.area_permissions, action];
    }
  }



  return  listPermissions;
}

const deleteToRol = ( permissions : any , area: string, action : string  ) => {

  const listPermissions= permissions;

  const permissionToUpdate = listPermissions.permissions.find((permission : any ) => { return permission.area === area});

  if(!permissionToUpdate){
    return listPermissions;
  }


  permissionToUpdate.area_permissions = permissionToUpdate.area_permissions.filter((option : string) => {  return option != action });


   listPermissions.permissions =listPermissions.permissions.filter( ( permission : any ) => {return  permission.area_permissions.length>0});


  return listPermissions;
}


// export const compareRol = ( roles : RolResp[], user : User ) =>{
//   const rolesFromUser  = user.rol_id.split(',').map( rol_id => +rol_id);


//   const rolesFiltered = roles.filter( (rol) =>
//       rolesFromUser.includes(rol.rol_id)
//   )


//   return getRoutes(rolesFiltered);

// }


// export const getRoutes =  ( roles : RolResp[]) => {

//   // const routes = roles.map( rol => JSON.parse(rol.rol_structure));
//   // console.log(routes);
//   let routes : any[] = [];
//   roles.forEach( rol => {
//     const route = JSON.parse(rol.rol_structure);
//     routes = [...routes, ...route.permissions];
//   });


//   return reduceRepeatRoutes(routes);


// }



export const reduceRepeatRoutes = ( routes : any[])  => {


  return  routes.reduce((acc, current) => {
    // Check if the current 'area' is already present in the accumulator array
    const isDuplicate = acc.some((obj : any) => obj.area === current.area);

    // If it's not a duplicate, add it to the accumulator array
    if (!isDuplicate) {
      acc.push(current);
    }

    return acc;
  }, []);


}
