import { Component, OnInit,ViewChild } from '@angular/core';
import { FileService } from '../services/file.service';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

   data:any;

   @ViewChild('cropper', undefined)
   cropper:ImageCropperComponent;
   cropperSettings:CropperSettings;
    
   

  file: File = null;

  constructor(private fileService: FileService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};

   }

   fileChangeListener($event) {
    var image:any = new Image();
    this.file = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(this.file);
   }

  ngOnInit() {}  

uploadFile() {
  console.log('uploading the file ..... ');

  this.fileService.postFile(this.file).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}

}
