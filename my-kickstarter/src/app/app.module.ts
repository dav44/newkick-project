import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { CategoriePageComponent } from './components/categorie-page/categorie-page.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { UserPageComponent } from './components/user-page/user-page.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './routes-guards/auth.guard';


const appRoutes: Routes = [
  {path: '', component: CategoriePageComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {path: 'projectpage/:id', component: ProjectPageComponent},
  {path: 'createproject', component: CreateProjectComponent, canActivate:[AuthGuard]},
  {path: 'userpage', component: UserPageComponent, canActivate:[AuthGuard]}
  
]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SignUpComponent,
    LogInComponent,
    CategoriesNavComponent,
    FooterComponent,
    ProjectPageComponent,
    CategoriePageComponent,
    CreateProjectComponent,
    UserPageComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
