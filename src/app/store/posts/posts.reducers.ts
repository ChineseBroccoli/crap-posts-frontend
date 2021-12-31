import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models/post.model";
import { PostResponse } from "src/app/models/post-response.model";
import * as PostsActions from "./posts.actions";
import * as UserActions from '../user/user.actions';

export interface GeneralPostsState {
    generalPosts: PostResponse[];
    loading: boolean;
}

export interface UserPostsState {
    userPosts: PostResponse[];
    loading: boolean;
}

export interface PostsState {
    generalPostsState: GeneralPostsState,
    userPostState: UserPostsState
}

export const initialPostState: PostsState = {
    generalPostsState: { generalPosts: [], loading: true },
    userPostState: { userPosts: [], loading: true }
}


export const postsReducer = createReducer(
    initialPostState,
    on(PostsActions.getGeneralPostsSuccess, (state, action) => {
        return { ...state, generalPostsState: { generalPosts: action.generalPosts, loading: false } };
    }),
    on(PostsActions.getUserPostsSuccess, (state, action) => {
        console.log("Hello getting user posts");
        return { ...state, userPostState: { userPosts: action.userPosts, loading: false } }
    }),
    on(PostsActions.editPostSuccess, PostsActions.votePostSuccess, (state, action) => {
        const updatePostMapper = (postResponse: PostResponse) => {
            if (postResponse.post.id === action.postResponse.post.id)
            {
                return action.postResponse;
            }
            return postResponse
        }
        let generalPosts: PostResponse[] = state.generalPostsState.generalPosts.map(updatePostMapper);
        let userPosts: PostResponse[] = state.userPostState.userPosts.map(updatePostMapper);
        return { ...state, generalPostsState: { ...state.generalPostsState, generalPosts }, userPostState: { ...state.userPostState, userPosts } };
    }),
    on(PostsActions.deletePostSuccess, (state, action) => {
        const removeFilter = (postResponse: PostResponse) => action.postId !== postResponse.post.id;
        let generalPosts: PostResponse[] = state.generalPostsState.generalPosts.filter(removeFilter);
        let userPosts: PostResponse[] = state.userPostState.userPosts.filter(removeFilter);
        return { ...state, generalPostsState: { ...state.generalPostsState, generalPosts }, userPostState: { ...state.userPostState, userPosts} }; 
    }),
    on(PostsActions.createPostSuccess, (state, action) => {
        let generalPosts: PostResponse[] = [action.postResponse, ...state.generalPostsState.generalPosts];
        let userPosts: PostResponse[] = [action.postResponse, ...state.userPostState.userPosts];
        return { ...state, generalPostsState: { ...state.generalPostsState, generalPosts }, userPostState: { ...state.userPostState, userPosts } }; 
    }),
    on(UserActions.logout, (state, action) => {
        return { ...state, userPostState: { userPosts: [], loading: true }}
    })
)


