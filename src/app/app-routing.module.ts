import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyPostsPageComponent } from './pages/my-posts-page/my-posts-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "posts", component: PostsPageComponent },
  { path: "account", component: AccountPageComponent, canActivate: [AuthGuardService] },
  { path: "register", component: RegisterPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "create-post", component: CreatePostPageComponent },
  { path: "my-posts", component: MyPostsPageComponent },
  { path: "edit-post/:id", component: EditPostPageComponent },
  { path: "**", component: ErrorPageComponent}

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
