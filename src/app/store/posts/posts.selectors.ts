import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostResponse } from "src/app/models/post-response.model";
import { UserPostsState } from ".";
import { PostsState} from "./posts.reducers";

export const getPostsFeatureState = createFeatureSelector<PostsState>("postsState");

export const selectGeneralPostsState = createSelector(
    getPostsFeatureState,
    (postsState: PostsState) => postsState.generalPostsState
)

export const selectUserPostsState = createSelector(
    getPostsFeatureState,
    (postsState: PostsState) => postsState.userPostState
)

export const getUserPostById = (id: number) => createSelector(
    selectUserPostsState,
    (userPostsState: UserPostsState) => userPostsState.userPosts.find(postResponse => postResponse.post.id === id)
)