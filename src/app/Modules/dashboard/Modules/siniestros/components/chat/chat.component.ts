import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {  Beneficiario } from '../../../../../core/models/Beneficiario.model';
import { ComunicacionSiniestroService } from '../../../../../core/services/comunicacion-siniestro.service';
import { Size, PositionMessage } from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { ImagesService } from '../../services/images.service';
import { RespBucketS3 } from '../../models/RespBucketS3.model';
import { ComunicacionSiniestro, ComunicacionSiniestroPost } from '../../../../../core/models/ComunicacionSiniestro.model';
import { Siniestro } from 'src/app/Modules/core/models/Siniestro.model';

@Component({
  selector: 'chat',
  templateUrl : './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent  implements OnInit {
  ngOnInit(): void {

    this.fetchdata();

    this.chatForm.get('url_archivo')?.valueChanges.subscribe( (newValue : any)=> {

      this.fileName = (newValue as File).name;

    })

  }

  fetchdata() {
    const process = new Subject();
    const observer = process.asObservable();


    this.onLoading(observer);

    this.comunicacionService.getAll().subscribe({
      next : ( resp ) => {
        console.log(this.siniestro);
        this.comunicacionSiniestros = resp.filter(item => item.siniestro_id == this.siniestro.siniestro_id);
        process.complete();
      },
      error : (err ) => {

        process.complete();
      }
    })


  }

  @Input() siniestro! : Siniestro;
  @Input() beneficiario! : Beneficiario;


  comunicacionSiniestros : ComunicacionSiniestro[] = [];

  chatForm = new FormGroup({
    message : new FormControl(null, [Validators.required]),
    url_archivo : new FormControl(null),
  })

  fileName = "";

  private notificationModalService = inject(NotificationService);
  private comunicacionService = inject(ComunicacionSiniestroService);
  private imagesService = inject(ImagesService);


  onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      this.chatForm.get('url_archivo')!.setValue(file);
    }
  }

  async submitForm(){


    if(!this.chatForm.valid){
      return;
    }


    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);


    let fileToUpload: File | null = null;

    let filePath = 'no';

    const {message, url_archivo} = this.chatForm.value;

    if (url_archivo) {
      console.log(url_archivo);
      fileToUpload = url_archivo as File;
    }

    if( fileToUpload){
      if (  this.isFileExtension(fileToUpload.name.split('.').reverse()[0])) {
        const resp: RespBucketS3 = await this.imagesService.subirArchivo(
          fileToUpload,
          "messages"
        );
        filePath = resp.Location;
      }else{
        process.complete();
        this.onError("File not supported");
        return;
      }
    }



    const newMessage : ComunicacionSiniestroPost = {
      mensaje : message! as string,
      siniestro_id :  this.siniestro.siniestro_id!,
      url_archivo : filePath ,
      es_operador : 1,
      fecha_mesaje : new Date().toISOString().split('T')[0]
    }


    this.comunicacionService.create(newMessage).subscribe({
      next : (resp) => {
        console.log(resp);
        this.comunicacionSiniestros.push(resp);
        this.chatForm.get('url_archivo')!.setValue(null);
        this.chatForm.get('message')?.setValue(null);
        process.complete();


      },
      error : (err) => {
        process.complete();
        this.onError(err);
      }

    })

  }



  isFileExtension(value: string): boolean {
    return ['jpg', 'pdf','png', 'jpeg', 'webp', 'tsv', 'xlsx'].includes(value);
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






}
