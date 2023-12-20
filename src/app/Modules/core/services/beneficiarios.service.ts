import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Beneficiario } from '../models/Beneficiario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService implements CRUDService<Beneficiario> {
  constructor() {}
  getAll(): Observable<Beneficiario[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Beneficiario[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Beneficiario): Observable<Beneficiario> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Beneficiario): Observable<Beneficiario> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
