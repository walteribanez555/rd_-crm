import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oficina, OficinaPost } from '../models/Oficina';

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  private apiUrl = environment.apiAuthUrl+'/offices';
  private http = inject(HttpClient);


  getAll( ) : Observable<Oficina[]> {
    return this.http.get<Oficina[]>(this.apiUrl).pipe(
      map( oficinas => {
        return oficinas.filter( oficina => oficina.status != 3);
      },
      )
    );
  }

  getById( id : string) : Observable<Oficina[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Oficina[]>(this.apiUrl, {params}).pipe(
      map((resp: Oficina[]) => {
        if (resp.length === 0) {
          throw new Error("No se encuentra la oficina");
        }
        return [resp[0]];
      })
    );
  }

  post( oficina : OficinaPost) : Observable<any>{
    return this.http.post(this.apiUrl,oficina);
  }


  update(id : string | number, data : any) : Observable<any> {
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.put(this.apiUrl, data, {params});

  }

  delete(id  :string | number) : Observable<any> {

    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.put(this.apiUrl, {status : '3'},{params});
  }






}
