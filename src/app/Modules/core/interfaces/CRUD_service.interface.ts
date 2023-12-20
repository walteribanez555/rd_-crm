import { Observable } from "rxjs";

export interface CRUDService<T> {
  getAll(): Observable<T[]>;
  getOne(id: string | number): Observable<T[]>;
  // create(item: T): Observable<T>;
  update(id: string | number, item: T): Observable<T>;
  delete(id: string | number): Observable<any>;
}
