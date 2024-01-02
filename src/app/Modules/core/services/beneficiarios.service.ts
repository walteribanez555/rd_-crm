import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Beneficiario, BeneficiarioToPost } from '../models/Beneficiario.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService implements CRUDService<Beneficiario> {


  private apiUrl = environment.apiUrl +'/beneficiarios';


  private http = inject(HttpClient);


  constructor() {}
  getAll(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Beneficiario[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Beneficiario[]>(this.apiUrl, { params }).pipe(
      map((resp: Beneficiario[]) => {
        if (resp.length === 0) {
          throw new Error("User Not Found");
        }
        return [resp[0]];
      })
    );
  }
  create(item: BeneficiarioToPost): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(this.apiUrl, item);
  }
  update(id: string | number, item: Beneficiario): Observable<Beneficiario> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
