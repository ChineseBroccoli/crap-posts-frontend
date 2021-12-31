import { userReducer, UserEffects, UserState, initialUserProfileState } from "./user";
import { initialPostState, PostsEffects, postsReducer, PostsState } from "./posts";
import { on } from "@ngrx/store";

export * from "./user";
export * from "./posts";

export interface AppState {
    userState: UserState;
    postsState: PostsState;
}

export const initialAppState: AppState = {
    userState: initialUserProfileState,
    postsState: initialPostState
}


export const appReducer = {
    userState: userReducer,
    postsState: postsReducer
}


export const appEffects = [UserEffects, PostsEffects]