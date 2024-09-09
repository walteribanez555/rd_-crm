import { Component, OnInit, inject } from '@angular/core';
import { CatalogosService } from './Modules/core/services';


(window as any).global = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(window.location.hostname);

    this.catalogoService.getAllUrls().subscribe({
      next : ( data) => {
        console.log(data);
      }
    });
  }


  private catalogoService = inject(CatalogosService);
  title = 'adminMonster';
}
