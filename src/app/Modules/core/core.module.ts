import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  BeneficiariosService,
  BeneficiosService,
  CatalogosService,
  ClientesService,
  ComunicacionSiniestroService,
  CuponesService,
  DescuentosService,
  ExtrasService,
  PlanesService,
  PolizasService,
  PreciosService,
  ReembolsosService,
  ServiciosService,
  SiniestrosService,
  VentasService,
} from './services';

@NgModule({
  declarations: [],
  imports: [RouterModule, CommonModule, HttpClientModule],
  providers: [
    BeneficiariosService,
    BeneficiosService,
    CatalogosService,
    ClientesService,
    ComunicacionSiniestroService,
    CuponesService,
    ExtrasService,
    PlanesService,
    PolizasService,
    PreciosService,
    ReembolsosService,
    ServiciosService,
    SiniestrosService,
    VentasService,
    DescuentosService,
  ],
  exports: [],
  bootstrap: [],
})
export class CoreModule {}
