import { createAction, props } from "@ngrx/store";
import { PostCreate } from "src/app/models/post-create.model";
import { Post } from "src/app/models/post.model";
import { PostResponse } from "src/app/models/post-response.model";


export const getGeneralPosts = createAction(
    "[Posts] Get General"
);

export const getGeneralPostsSuccess = createAction(
    "[Posts] Get General Success",
    props<{ generalPosts: PostResponse[] }>()
)

export const getUserPosts = createAction(
    "[Posts] Get User",
    props<{ userId: number}>()
)

export const getUserPostsSuccess = createAction(
    "[Posts] Get User Success",
    props<{ userPosts: PostResponse[] }>()
)

export const createPost = createAction(
    "[Posts] Create Post",
    props<{ postCreate: PostCreate }>()
)

export const createPostSuccess = createAction(
    "[Posts] Create Post Success",
    props<{ postResponse: PostResponse }>()
)

export const editPost = createAction(
    "[Posts] Edit Post",
    props<{ postId: number; postCreate: PostCreate }>()
)

export const editPostSuccess = createAction(
    "[Posts] Edit Post Success",
    props<{ postResponse: PostResponse }>()
)

export const deletePost = createAction(
    "[Posts] Delete Post",
    props<{ postId: number }>()
)

export const deletePostSuccess = createAction(
    "[Posts] Delete Post Success",
    props<{ postId: number }>()
)

export const getPostById = createAction(
    "[Posts] Get By Id",
    props<{ postId: number }>()
);

export const getPostsByUserId = createAction(
    "[Posts] Get By User Id",
    props<{ userId: number, userPosts: Post[] }>()
);

export const upvotePost = createAction(
    "[Posts] Upvote",
    props<{ postId: number }>()
)

export const downvotePost = createAction(
    "[Posts] Downvote",
    props<{ postId: number }>()
)

export const unvotePost = createAction(
    "[Posts] Unvote",
    props<{ postId: number }>()
)

export const votePostSuccess = createAction(
    "[Posts] Vote Post Success",
    props<{ postResponse: PostResponse }>()
)

export const votePostFail = createAction(
    "[Post] Vote Fail",
    props<{ errorResponse: any }>()
)