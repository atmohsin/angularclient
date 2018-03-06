import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

  baseURL = "http://localhost:8000/api/upload";

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log(' file uload service ');  
    return  this.httpClient.post(this.baseURL , formData)
    .map(response => response)
    .catch(error => Observable.throw(error));  
  }

      getImages() {
        return this.httpClient.get(this.baseURL+"getImages")
                    .map(response => response)
                    .catch(error=>Observable.throw(error));
      }

  

}
