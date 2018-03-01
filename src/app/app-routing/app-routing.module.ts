import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { PageNotFoundComponent } from '../not-found.component';

const routes: Routes = [
        { path: 'user', component: UserComponent },
        { path: '', component: LoginComponent },
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
