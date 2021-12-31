import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from './models/user.model';
import { AppState, getUserFeatureState, selectIsLoggedIn, selectUserProfile, UserState } from './store';
import * as UserActions from "./store/user/user.actions";
import * as PostsActions from "./store/posts/posts.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Crap Posts';
  currentRoute: string = "";
  userState: Observable<UserState>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userState = this.store.select(getUserFeatureState);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event =>
      this.currentRoute = (event as RouterEvent).url);
    
    this.store.dispatch(PostsActions.getGeneralPosts());

    this.userState.subscribe(userState => {
      this.store.dispatch(UserActions.getUserInfo({ loggedIn: userState.isLoggedIn }));
    }).unsubscribe();
  }

  ngOnInit(): void {
    console.log("app init");
  }

  logOut(): void {
    this.store.dispatch(UserActions.logout());
  }


}
