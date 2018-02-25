import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../models/user';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public userService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit(form: NgForm) {
  // emppty stuff
  console.log(form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(form: NgForm): void {
    console.log(form.value);
    this.userService.addUser(form.value);
  }
}
