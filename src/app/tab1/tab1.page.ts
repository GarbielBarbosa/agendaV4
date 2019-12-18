import { Component } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  imageResponse: any;
  options: any;
  name: string;
  phone: string;
  cellPhone: string;
  photo: string = null;
  constructor(
    private imagePicker: ImagePicker,
    private databaseService: DatabaseService
  ) {
    this.databaseService.createTableContatos();
  }

  getImages() {
    this.options = {

      width: 200,

      quality: 25,

      outputType: 1,
      maximumImagesCount: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.photo = results[i];
      }
    }, (err) => {
      //alert(err);
    });
  }

  saveContato() {
    this.databaseService.insertRowContatos(this.name, this.phone, this.photo);
    this.name = this.phone = this.photo = null;
  }

}
