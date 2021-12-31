import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import * as UserActions from './user.actions';
import { catchError, exhaustMap, map, of, tap, } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import * as PostsActions from "../posts/posts.actions";

@Injectable()
export class UserEffects {
    login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        exhaustMap(action => 
            this.userService.login(action.loginCredentials).pipe(
                map(loginResponse => UserActions.loginSuccess({ loginResponse, isLoggedIn: true})),
                catchError(errorResponse => of(UserActions.loginFail({ errorResponse })))
            )
        )
    ))

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(res => {
            this.userService.setToken(res.loginResponse.jsonWebToken);
            this.store.dispatch(PostsActions.getUserPosts({ userId: res.loginResponse.user.id }));
            this.router.navigate(["/home"]);
        })
    ), { dispatch: false });

    register$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.register),
        exhaustMap(action => 
            this.userService.register(action.registerCredentials).pipe(
                map(() => UserActions.registerSuccess()),
                catchError(errorResponse => of(UserActions.registerFail({ errorResponse })))
            )
        )
    ))

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(() => {
            this.router.navigate(["/login"]);
        })
    ), { dispatch: false })

    getUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserInfo),
        exhaustMap(action => 
            this.userService.getUserInfo().pipe(
                map(responseUser => UserActions.getUserInfoSuccess({ responseUser })),
                catchError(errorResponse => of(UserActions.getUserInfoFail({ errorResponse, loggedIn: action.loggedIn })))
            )
        )
    ));

    getUserInfoSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserInfoSuccess),
        tap(res => {
            this.store.dispatch(PostsActions.getUserPosts({ userId: res.responseUser.id }));
        })
    ), { dispatch: false })

    getUserInfoFail$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserInfoFail),
        tap(action => {
            if (action.loggedIn)
            {
                this.router.navigate(["/login"]);
            }
        })
    ), { dispatch: false })

    logOut$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logout),
        tap(() => {
            this.userService.logout();
            this.router.navigate(["/home"]);
        })
    ), { dispatch: false })

    constructor(private actions$ : Actions, private userService: UserService, private router: Router, private store: Store<AppState>) {}
}