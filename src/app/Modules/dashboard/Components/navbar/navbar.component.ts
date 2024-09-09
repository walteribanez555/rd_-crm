import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { lang } from 'moment';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actualDir : string = 'Dashboard';
  lightActive = true;
  darkActive = false;
  email : string = "";

  @Output() displayNav = new EventEmitter();


  private sessionService = inject(SessionService);


  lang = '';





  constructor(

    // private authService : AuthService,
    private router : Router,){


  }

  changeLeng(event : any) {
    const selectedLanguage = event.target.value;


    localStorage.setItem('lang', selectedLanguage);
  }


  ngOnInit() {

    const lng = localStorage.getItem('lang');

    if(!lng){
      localStorage.setItem('lang', 'es');
    }

    // this.email = this.authService.getEmail();
    this.actualDir = localStorage.getItem('client_id') ?? "Usuario-default";
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.actualDir =
    //     // Perform any additional actions based on the route change
    //   }
    // });

    this.lang = localStorage.getItem('lang')!;
  }




  toggleSidenav(){
    this.displayNav.emit();
  }

  logout(){
    this.sessionService.logout();
    this.router.navigateByUrl('/auth/login');

  }


  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;

  }



}
