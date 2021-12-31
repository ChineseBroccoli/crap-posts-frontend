import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer, appEffects } from './store'; 


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {NzListModule } from 'ng-zorro-antd/list'

import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { FileTextFill, UserOutline, LockOutline, EditOutline } from '@ant-design/icons-angular/icons';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { CommonModule } from '@angular/common';
import { MyPostsPageComponent } from './pages/my-posts-page/my-posts-page.component';
import { UserService } from './service/user/user.service';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { NgVarDirective } from './directives/ng-var.directive';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';

const icons: IconDefinition[] = [FileTextFill, UserOutline, LockOutline, EditOutline];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostsPageComponent,
    AccountPageComponent,
    ErrorPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MyPostsPageComponent,
    NgVarDirective,
    CreatePostPageComponent,
    EditPostPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSkeletonModule,
    NzListModule,
  ],
  providers: [
    UserService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
