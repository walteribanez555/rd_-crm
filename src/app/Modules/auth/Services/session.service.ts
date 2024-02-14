import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IntentLogin, ResponseLogin } from '../models/IntentLogin';
import { Token } from '../../shared/utils/tokens';
import { UserService } from '../../core/services/user.service';
import { RolesService } from '../../core/services/roles.service';
import { User } from '../../core/models/User';
import { Rol } from '../../core/models/Rol';
import { OficinasService } from '../../core/services/oficinas.service';
import { Oficina } from '../../core/models/Oficina';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private rolService = inject(RolesService);
  private officeService = inject(OficinasService);
  private apiUrl = environment.apiAuthUrl + '/sessions';


  private rols : Rol[] = [];
  private oficces : Oficina[] = [];

  login(intentLogin: IntentLogin): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.apiUrl, intentLogin).pipe(
      switchMap((responseLogin) => {
        return this.userService.getUser(intentLogin.username).pipe(
          this.receiveRols,
          this.receiveOficces,
          map((resp) => {
            return responseLogin;
          })
        );
      }),
      tap((resp) => {
        const [client_id, ...office_id] = intentLogin.username.split('_');
        localStorage.setItem('client_id', client_id);
        // localStorage.setItem('office_id', office_id.join());
        Token.setToken(resp.sessionToken);
      })
    );
  }


  getRolsFromUser()  : Observable<Rol[]> {
    // console.log(this.rols, "Desde el servicio");
    if(this.rols.length == 0) {
      const rols_id = localStorage.getItem('rol_id')?.split(',');
      const requests : any[] =  rols_id!.map( rol => this.rolService.getById(rol));
      return forkJoin(requests).pipe(
        map( resp => {
          return resp.flat();
        })
      )
    }


    return of(this.rols);
  }


  getOfficesFromUser() : Observable<Oficina[]> {

    if(this.oficces.length == 0 ) {
      const oficces_id = localStorage.getItem('office_id')?.split(',');
      const requests : any[] = oficces_id!.map( ofi => this.officeService.getById(ofi) );
      return this.officeService.getAll().pipe(
        map((resp) => {
          return resp.filter( ofi => oficces_id!.includes(ofi.office_id.toString()));
        })
      );
    }

    return of(this.oficces);
  }


  getUser() {
    return localStorage.getItem('client_id');
  }


  logout() {
    localStorage.removeItem('client_id');
    localStorage.removeItem('office_id');
    Token.deleteToken();
  }

  receiveRols = mergeMap((usersById: User[]) => {
    const rols = usersById[0].rol_id;
    localStorage.setItem('rol_id', rols );
    return of(usersById);
  });

  receiveOficces = mergeMap((userById: User[]) => {
    const user = userById[0];
    localStorage.setItem('office_id',user.office_id);
    return of(userById);
    //CASO DE QUERER CONSULTAR, GUARDAR Y ENVIAR DE NUEVO EL USUARIO
    // const requests: any[] = offices.map((ofi) =>
    //   this.officeService.getById(ofi)
    // );
    // return forkJoin(requests).pipe(
    //   map((officesResp: Oficina[][]) => {
    //     this.oficces = officesResp.flat();
    //     localStorage.setItem('office_id', this.oficces.map(ofi => ofi.office_id).join(','));

    //     return userById;
    //   })
    // );
  });
}
