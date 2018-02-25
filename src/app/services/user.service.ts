import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private readonly API_URL = "http://localhost:8000/api/users/";

    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]> ([]);
    
    dialogData: any;

    constructor (private httpClient: HttpClient) {}

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
        this.dialogData = user;
        this.httpClient.post(this.API_URL, user).subscribe(data => {
            console.log(' User added .... ');
            //this.toasterService.showToaster('Successfully added', 3000);
            },
            (err: HttpErrorResponse) => {
            console.log(' error while adding user...');
            //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
          });
    }

    updateUser( user: User): void {
        this.dialogData = user;

        this.httpClient.put(this.API_URL + user.id, user).subscribe(data => {
            //this.dialogData = kanbanItem;
            //this.toasterService.showToaster('Successfully edited', 3000);
            console.log('Updated the user');
          },
          (err: HttpErrorResponse) => {
            //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
            console.erro(err);
          }
        );
    }

    deleteUser ( id: number): void {
        console.log(id);
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
            console.log(data['']);
              //this.toasterService.showToaster('Successfully deleted', 3000);
              console.log(' User deleted..');
            },
            (err: HttpErrorResponse) => {
              //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
              console.error(err);
            }
          );
    }


}