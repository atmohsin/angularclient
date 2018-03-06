import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { PageNotFoundComponent } from '../not-found.component';
import { AuthGuard } from '../guards/auth.guards';
import { FileUploadComponent } from '../file-upload/file-upload.component';

const routes: Routes = [
        { path: '', component: LoginComponent },
        { path: 'user', component: UserComponent},
        { path: 'upload', component: FileUploadComponent},
        { path : '**', component: PageNotFoundComponent}
    ];

@NgModule({
      imports: [
          RouterModule.forRoot(routes)
      ],
      exports: [
          RouterModule
      ],
      declarations: []
  })
  export class AppRoutingModule { }
