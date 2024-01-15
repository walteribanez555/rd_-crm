import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../Services/session.service';
import { IntentLogin } from '../../models/IntentLogin';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { Observable, Subject } from 'rxjs';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.isAuth();
  }



  private router = inject(Router);


  authForm = new FormGroup({
    username : new FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required]),
  });


  private sessionService = inject(SessionService);
  private notificationModalService = inject(NotificationService);


  login() {
    if(!this.authForm.valid){
      return;
    }

    const onProcessLogin = new Subject();
    const observerProcessLogin = onProcessLogin.asObservable();

    this.onLoading(observerProcessLogin);

    const {username , password} = this.authForm.value;

    const intentlogin : IntentLogin = {
      username : username! as string,
      password : password! as string
    }

    this.sessionService.login(intentlogin).subscribe({
      next: (resp) => {
        onProcessLogin.complete();
        this.onSuccess("Ingresando a la plataforma");
      },

      error : (err) => {
        onProcessLogin.complete();
        this.onError("Error en el inicio de sesion");
      },

      complete : () => {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }


  onSuccess(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificationModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificationModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }



  isAuth() {
    const authorization = localStorage.getItem('Authorization');
    if(!authorization){
      return;
    }

    if(authorization !== "ExternalUser902010" ){
      this.router.navigateByUrl('/dashboard');
    }
  }



}
