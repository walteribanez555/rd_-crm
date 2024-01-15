import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  Subject,
  Observable,
} from 'rxjs';
import { User } from 'src/app/Modules/core/models/User';
import { UserService } from 'src/app/Modules/core/services/user.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent implements OnInit {


  private notificacionModalService = inject(NotificationService);

  ngOnInit(): void {
     this.searchTerm$.pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => (term ? this.userService.getUser(term) : of(this.listUsers)))
    ).subscribe( resp => {
      this.listUsersFiltered = resp;
    });

    this.fetchData();


  }

  isClicked: boolean = false;
  isHideInfo: boolean = false;
  searchTerm$ = new Subject<string>();
  searchResults$?: Observable<any>;
  private userService = inject(UserService);

  listUsers : User[] = [];
  listUsersFiltered : User[] = [];

  onChangeClick() {
    this.isClicked = !this.isClicked;
  }

  onClickInfo() {
    this.isHideInfo = !this.isHideInfo;
  }

  search(event : any): void {
    if (event.target.value) {
      this.searchTerm$.next(event.target.value);
    }
  }

  fetchData() {

    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.userService.getAll().subscribe(resp => {
      process.complete();
      this.listUsers = resp;
      this.listUsersFiltered = this.listUsers;
    })

  }




  onSuccess(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }

}
