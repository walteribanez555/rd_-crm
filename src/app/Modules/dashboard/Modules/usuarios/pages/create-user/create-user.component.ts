import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {


  blog = new FormControl(null);

  description_card = new FormControl(null);
  title_card = new FormControl(null);
  url_img = new FormControl( "../../../../../../../assets/images/ASSISTRIP/app y web/4.jpg");


  pos : number = 0;
  dynamicWidth = '0%';
  width : number = 0;


  onChangeStepForm(posToChange : number ){

    if(posToChange >= 0  && posToChange<=3){

      this.width = posToChange*50;
      this.dynamicWidth = this.width+"%";

      this.pos = posToChange;
    }

  }

  prueba() {
    console.log(this.url_img.value);
    console.log(this.blog.value);
    console.log(this.title_card.value);
    console.log(this.description_card.value);
  }

}
