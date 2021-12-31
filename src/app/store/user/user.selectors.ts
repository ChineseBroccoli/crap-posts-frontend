import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const getUserFeatureState = createFeatureSelector<UserState>("userState");

export const selectIsLoggedIn = createSelector(
    getUserFeatureState,
    (state: UserState) => state.isLoggedIn
);

export const selectUserProfile = createSelector(
    getUserFeatureState,
    (state: UserState) => state.userProfile
)

export const selectUserFormErrors = createSelector(
    getUserFeatureState,
    (state: UserState) => state.errorMessages
)

