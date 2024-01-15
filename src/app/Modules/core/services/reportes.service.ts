import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte, ReporteSiniestro } from '../models/Reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;


  getByUsername( id : string, initialDate : string, finalDate : string ) : Observable<Reporte[]> {

    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('init' , initialDate);
    params = params.append('end' , finalDate);


    const apiToReport = this.apiUrl+'/reporteOperadores';
    return this.http.get<Reporte[]>(apiToReport, {params});

  }

  getByClientId( id : string) : Observable<Reporte[]> {
    let params = new HttpParams();
    params = params.append('id', id);


    const apiToReport = this.apiUrl+'/reporteVentas';
    return this.http.get<Reporte[]>(apiToReport, {params});


  }

  getByOffice( id : string | number, initialDate : string, finalDate : string ) : Observable<Reporte[]>{
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('init' , initialDate);
    params = params.append('end' , finalDate);


    const apiToReport = this.apiUrl+'/reporteOficinas';

    return this.http.get<Reporte[]>(apiToReport, {params});

  }

  get( initialDate : string, finalDate : string): Observable<Reporte[]>{
    let params = new HttpParams();
    params = params.append('init' , initialDate);
    params = params.append('end' , finalDate);

    const apiToReport = this.apiUrl+'/reporteVentas';

    return this.http.get<Reporte[]>(apiToReport, {params});
  }


  getSiniestros( initialDate : string, finalDate : string): Observable<ReporteSiniestro[]>{
    let params = new HttpParams();
    params = params.append('init' , initialDate);
    params = params.append('end' , finalDate);

    const apiToReport = this.apiUrl+'/reporteSiniestros';

    return this.http.get<ReporteSiniestro[]>(apiToReport, {params});
  }


  constructor() { }

}
