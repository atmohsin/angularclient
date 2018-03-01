import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class UserService {
    private readonly API_URL = "http://localhost:8000/api/users/";

    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]> ([]);
    
    dialogData: any;

    constructor (private httpClient: HttpClient,private _flashMessagesService: FlashMessagesService) {}

    get data(): User[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    getUsers(): Observable<User[]> {
        return this.httpClient
        .get(this.API_URL)
        .map((result: Response)=> result.data)
    
      }
    
      get(id: string) {
        return this.httpClient
        .get(this.API_URL + '/' + id)
        .map((result: Response)=> result.data)
      }
    getAllUsers(): void {
        this.httpClient.get<User[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data.data);
        },
        (error: HttpErrorResponse) => {
            console.log( error.name+ '' +error.message);
        });
    }

    addUser( user: User): void {
        //this.dialogData = user;
        this.httpClient.post(this.API_URL, user).subscribe(data => {
            var userObj : User;
            userObj = data.data;
            console.log(userObj);
            this.dialogData = userObj;
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('User Added Successfully.', { cssClass: 'alert-success', timeout: 3000, showCloseBtn:false });
            },
            (err: HttpErrorResponse) => {
            console.error(err);
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('Error while adding User.', { cssClass: 'alert-danger', timeout: 3000, showCloseBtn:false });
          });
    }

    updateUser( user: User): void {
        this.dialogData = user;

        this.httpClient.put(this.API_URL + user.id, user).subscribe(data => {
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('User Updated Successfully.', { cssClass: 'alert-success', timeout: 3000, showCloseBtn:false });
          },
          (err: HttpErrorResponse) => {
            console.error(err);
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('Error while updating User.', { cssClass: 'alert-danger', timeout: 3000, showCloseBtn:false });
          }
        );
    }

    deleteUser ( id: number): void {
        console.log(id);
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('User Deleted Successfully.', { cssClass: 'alert-success', timeout: 3000, showCloseBtn:false });
            },
            (err: HttpErrorResponse) => {
              console.error(err);
              this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show('Error while deleting User.', { cssClass: 'alert-danger', timeout: 3000, showCloseBtn:false });
            }
          );
    }


}