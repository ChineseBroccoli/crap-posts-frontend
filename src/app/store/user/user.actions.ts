import { createAction, props } from '@ngrx/store';
import { LoginResponse } from 'src/app/models/login-response.model';
import { User } from 'src/app/models/user.model';
import { LoginCredentials } from '../../models/login-credentials.model';
import { RegisterCredentials } from '../../models/register-credentials.model';

export const login = createAction(
    "[User] Login",
    props<{loginCredentials: LoginCredentials}>()
);

export const loginSuccess = createAction (
    "[User] Login Success",
    props<{ loginResponse: LoginResponse, isLoggedIn: boolean }>()
);

export const loginFail = createAction (
    "[User] Login Failed",
    props<{ errorResponse: any }>()
)

export const register = createAction(
    "[User] Register",
    props<{registerCredentials: RegisterCredentials}>()
);

export const registerSuccess = createAction(
    "[User] Register Success"
);

export const registerFail = createAction(
    "[User] Register Fail",
    props<{ errorResponse: any }>()
);

export const logout = createAction(
    "[User] Logout"
);

export const getUserInfo = createAction(
    "[User] Get Info",
    props<{ loggedIn: boolean }>()
);

export const getUserInfoSuccess = createAction(
    "[User] Get Info Success",
    props<{ responseUser: User }>()
)

export const getUserInfoFail = createAction(
    "[User] Get Info Fail",
    props<{ errorResponse: any, loggedIn: boolean }>()
);

export const clearErrorMessages = createAction(
    "[User] Clear Error Messages"
)