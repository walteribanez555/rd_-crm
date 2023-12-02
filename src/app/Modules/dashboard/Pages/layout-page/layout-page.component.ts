import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {


  actualDir : string = 'Dashboard';
  display_sidenav = false;
  lightActive = true;
  darkActive = false;








  constructor(
    private cdr : ChangeDetectorRef,
    private elementRef: ElementRef,
    private router : Router,){

  }


  ngOnInit(){

    // if(!this.authService.isLoggedIn()){
    //   this.router.navigate(['login']);
    // }
  }


  ngOnDestroy() {
  }


  cargarHeader(direccion : string){
    this.actualDir = direccion;
    this.cdr.detectChanges();
  }


  toggleDropdown(menuItem : any) {
    menuItem.isDropdownOpen = !menuItem.isDropdownOpen;
    menuItem.dropdownHeight = menuItem.isDropdownOpen ? menuItem.submenuItems.length * 50 + 'px' : '0';
  }



  closeDropdown(menuItem : any) {
    menuItem.isDropdownOpen = false;
    menuItem.dropdownHeight = '0';
  }

  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;

  }

  toggleSidenav(){
    this.display_sidenav = !this.display_sidenav;
  }


  // logout(){
  //   this.authService.logout();
  //   this.router.navigate(['../../../auth/login']);
  // }


}
