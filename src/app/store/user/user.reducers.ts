import { createAction, on, Action, createReducer } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { initialPostState } from '..';
import * as UserActions from "./user.actions";

export interface UserState {
    userProfile: User | null;
    isLoggedIn: boolean;
    errorMessages: { [s: string]: string }
}

export const initialUserProfileState : UserState = {
    userProfile: null,
    isLoggedIn: false,
    errorMessages: {}
}

export const userReducer = createReducer(
    initialUserProfileState,
    on(UserActions.loginSuccess, (state, action) => {
        return { ...state, userProfile: action.loginResponse.user, isLoggedIn: true, errorMessages: {} };
    }),
    on(UserActions.loginFail, UserActions.registerFail, (state, action) => {
        return { ...state, errorMessages: action.errorResponse.error.errorMessages }
    }),
    on(UserActions.getUserInfoSuccess, (state, action) => {
        return { ...state, userProfile: action.responseUser , isLoggedIn: true, errorMessages: {}}
    }),
    on(UserActions.logout, (state, action) => {
        return initialUserProfileState;
    }),
    on(UserActions.clearErrorMessages, (state, action) => {
        return { ...state, errorMessages: {} };
    })
)